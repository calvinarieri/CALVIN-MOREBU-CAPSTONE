import { protectedAxiosInstance } from "./axios";

export async function handlelogin(data){
    console.log(data)
    try{
        const res = await protectedAxiosInstance.post('/auth/login/', data)
        console.log(res)
        return {
            success: true,
            status: res.status,
            data: res.data,
        };
    }catch(err){
        console.log(err)
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