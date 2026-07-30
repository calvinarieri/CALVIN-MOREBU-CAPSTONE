import axios from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL;

export const protectedAxiosInstance = axios.create({
    baseURL,
    timeout: 15000,
    withCredentials: true 
});

protectedAxiosInstance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

protectedAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loops on auth endpoints themselves
        if (originalRequest.url?.includes('/auth/refresh/') || originalRequest.url?.includes('/login')) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then(() => protectedAxiosInstance(originalRequest))
                .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axios.post(
                    `${baseURL}/auth/refresh/`, 
                    {}, 
                    { withCredentials: true }
                );
                
                isRefreshing = false;
                processQueue(null);
                
                return protectedAxiosInstance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError);
                
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);