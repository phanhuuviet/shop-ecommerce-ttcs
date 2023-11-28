import axios from 'axios';
import tokenValid from '../utils/checkExpireToken';
import * as authService from './authService';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(async function (config) {
    let token = JSON.parse(localStorage.getItem('access_token'));
    if (tokenValid(token)) {
        config.headers.Accept = 'application/json';
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        const data = await authService.refreshToken();
        config.headers.Authorization = data?.access_token;
    }
    return config;
});

export default axiosJWT;
