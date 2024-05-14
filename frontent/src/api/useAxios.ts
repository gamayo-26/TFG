/**
 * Crea una instancia de Axios con la configuración base.
 * @remarks
 * Esta función crea una instancia de Axios con la URL base configurada en "http://127.0.0.1:8000".
 * @returns Una instancia de Axios con la URL base configurada.
 */
import axios, { AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode";
import { Token } from "../interfaces";


function logout() {
    useAuthStore.getState().logout();
    window.location.href = '/login';
}


const baseURL = import.meta.env.VITE_BAKEND_URL


export const axi = axios.create({
    baseURL
});

export const authAxios = axios.create({
    baseURL,
    withCredentials: true
});

authAxios.interceptors.request.use(async (config) => {
    const token: string = useAuthStore.getState().access;
    config.headers = {
        Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;

    const tokenDecoded: Token = jwt_decode(token)

    const expiration = new Date(tokenDecoded.exp * 1000)
    const now = new Date();
    const fiveMin = 5 * 60 * 1000;

    if (expiration.getTime() - now.getTime() < fiveMin)
        try {
            const response = await axi.post('/users/token/refresh/', {refresh: useAuthStore.getState().refresh})
            useAuthStore.getState().setTokens(response.data.access, response.data.refresh)
        } catch (error) {
            logout();
        }
        return config;

});
