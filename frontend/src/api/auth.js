import { protectedAxiosInstance } from "./axios";

export async function handlelogin(data){
    try{
        const res = await protectedAxiosInstance.post('/auth/login/', data)
        return {
            success: true,
            status: res.status,
            data: res.data,
        };
    }catch(err){
        return{
            success: false,
            status: err.response?.status || 500,
            data: err.response?.data || { message: err.message }
        };
    };
}

export async function handleLogout(){
    try{
        const res = await protectedAxiosInstance.post('/auth/logout/')
        return {
            success: true,
            status: res.status,
            data: res.data,
        };
    }catch(err){
        return{
            success: false,
            status: err.response?.status || 500,
            data: err.response?.data || { message: err.message }
        };
    };
};