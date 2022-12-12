import axios from "axios";
import {appSettings} from "../config/config";
import {GoogleAuthApi} from "./google-auth-api";

export const AxiosInstance = axios.create({
    baseURL: appSettings.apiSettings.API_BASE_URL,
    withCredentials: true
});

async function setAuthHeader(config: any) {
    const token = localStorage.getItem('access-token');
    config.headers['Authorization'] = `Bearer ${token}`;
}

const setInterceptors = (instance: any) => {
    instance.interceptors.request.use(
        async (config: any) => {
            await setAuthHeader(config);
            return config;
        },
        (error: any) => Promise.reject(error)
    );
    instance.interceptors.response.use(
        (r: any) => r,
        async (error: any) => {
            try {
                return await responseErrorHandler(error, instance);
            } catch (e) {
                throw error;
            }
        }
    );
};


const responseErrorHandler = async (error: any, instance: any) => {
    const { config: originalReq, response } = error;
    if (
        originalReq.url !== 'api/admin/auth/refresh' &&
        !originalReq.isRetryAttempt &&
        response &&
        response.status === 401
    ) {
        try {
            const response = await GoogleAuthApi.refreshToken();
            localStorage.setItem('access-token', response.access_token);
            originalReq.isRetryAttempt = true;
            return await instance.request(originalReq);
        } catch (e) {
            console.log(e);
            throw e;
        }
    } else {
        throw error;
    }
};

setInterceptors(AxiosInstance);
