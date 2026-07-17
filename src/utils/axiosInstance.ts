import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('Token');
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response Interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	(error: unknown) => {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				switch (error.response.status) {
					case 401:
						localStorage.removeItem('token');
						window.location.href = '/login';
						break;

					case 500:
						console.error('Server error. Please try again later.');
						break;
				}

				return Promise.reject(
					new Error(
						error.response.data?.message ?? 'Something went wrong. Please try again later.',
					),
				);
			}

			if (error.code === 'ECONNABORTED') {
				return Promise.reject(new Error('Request timed out. Please try again.'));
			}

			if (!error.response) {
				return Promise.reject(
					new Error('Unable to connect to the server. Please check your internet connection.'),
				);
			}
		}

		return Promise.reject(new Error('Something went wrong. Please try again later.'));
	},
);

export default axiosInstance;
