import axios from "axios";
import {appSettings} from "../config/config";

export const AxiosInstance = axios.create({
    baseURL: appSettings.apiSettings.API_BASE_URL,
    withCredentials: true
});

