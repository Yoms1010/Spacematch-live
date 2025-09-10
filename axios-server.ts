'use server'

import axios, {
    AxiosInstance,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse
} from "axios";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "./components/cookie/LocalStorage";
import { cookies } from "next/headers";

// --- Configuration ---
// It's good practice to ensure the environment variable exists.
const baseURL = process.env.BACKEND_DEVELOPMENT_API;
if (!baseURL) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_BACKEND_DEVELOPMENT_API");
}

// --- Helper Function for Token Management ---
// Using an async function here prepares you for scenarios where the token
// might be stored in a place that requires an async call (e.g., secure storage).
const getAuthToken = async (): Promise<string | null> => {
    // In a real-world app, you might get this from an auth provider SDK
    // which would likely be an async operation.
    const cookieStore = await cookies()
    const token: string | undefined | null = cookieStore.get('ACCESS_TOKEN')?.value
    return token!;
};


const removeAuthToken = async () => {
    // In a real-world app, you might get this from an auth provider SDK
    // which would likely be an async operation.
    const cookieStore = await cookies()
    cookieStore.delete('ACCESS_TOKEN')
};


// --- Axios Client Initialization ---
const axiosClient = axios.create({
    baseURL: `${baseURL}/`,
});


// --- Request Interceptor ---
// Intercepts requests before they are sent to add the authorization token.
axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await getAuthToken();
        if (token && config.headers) {
            // Set the Authorization header for the request.
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        // This part handles errors that might occur during request setup.
        return Promise.reject(error);
    }
);


// --- Response Interceptor ---
// Intercepts responses to handle them globally.
axiosClient.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
        // Any status code within the range of 2xx causes this function to trigger.
        // We simply return the response data.
        return response;
    },
    (error: AxiosError) => {
        // Any status codes that fall outside the range of 2xx cause this function to trigger.
        const { response } = error;

        // Check for a 401 Unauthorized error.
        if (response && response.status === 401) {
            // This is where you would typically handle token expiration.
            // For example, you could redirect to a login page or try to refresh the token.
            (async () => {
              await removeAuthToken()
            })()
            // Optionally, redirect to login page
            window.location.href = '/sign-in';
            console.error("Unauthorized request - 401. Token removed.");
        }

        // It's crucial to reject the promise so that calling code can handle the error
        // with a .catch() block.
        return Promise.reject(error);
    }
);

export default axiosClient