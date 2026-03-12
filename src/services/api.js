import axios from 'axios';
import { supabase } from './supabaseService/supabaseClient';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
    const requiresAuth = config.requiresAuth ?? true;

    if (requiresAuth) {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

export default api;