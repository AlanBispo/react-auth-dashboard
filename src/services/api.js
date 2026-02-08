import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// antes de cada requisição, insere o Token se ele existir
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                if (!refreshToken) {
                    throw new Error('Sem refresh token');
                }

                // obtém um novo token usando o refresh token
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, 
                    {}, 
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        }
                    }
                );

                const { access_token } = response.data;

                localStorage.setItem('access_token', access_token);

                api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                return api(originalRequest);

            } catch (refreshError) {
                console.error("Sessão expirada. Faça login novamente.", refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;