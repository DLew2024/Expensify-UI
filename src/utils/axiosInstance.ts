import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_DEVELOPMENT_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('token');

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error: unknown) => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	(error: unknown) => {
		if (!axios.isAxiosError(error)) {
			return Promise.reject(new Error('Something went wrong. Please try again later.'));
		}

		if (error.code === 'ECONNABORTED') {
			return Promise.reject(new Error('Request timed out. Please try again.'));
		}

		if (!error.response) {
			return Promise.reject(
				new Error('Unable to connect to the server. Please check your internet connection.'),
			);
		}

		const requestUrl = error.config?.url ?? '';
		const isAuthRequest =
			requestUrl.includes('/login') ||
			requestUrl.includes('/register') ||
			requestUrl.includes('/refresh-token');

		if (error.response.status === 401 && !isAuthRequest) {
			localStorage.removeItem('token');

			window.location.assign('/login');
		}

		if (error.response.status === 500) {
			console.error('Server error. Please try again later.');
		}

		const responseData: unknown = error.response.data;

		const errorMessage =
			typeof responseData === 'string'
				? responseData
				: isErrorResponse(responseData)
					? responseData.message
					: 'Something went wrong. Please try again later.';

		return Promise.reject(new Error(errorMessage));
	},
);

interface ErrorResponse {
	message: string;
}

const isErrorResponse = (value: unknown): value is ErrorResponse => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'message' in value &&
		typeof value.message === 'string'
	);
};

export default axiosInstance;
