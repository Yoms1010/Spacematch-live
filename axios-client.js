
import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    // console.log(token);
    config.headers.Authorization = `Bearer ${token}`
    return config
})


axiosClient.interceptors.response.use((response)=> {
    return response;
}, (error) => {
    const {response} = error;
    // debugger;
    if (response.status == 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
})
export default axiosClient;