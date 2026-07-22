import axios from 'axios';
import toast from 'react-hot-toast';

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
			const message = 'Something went wrong. Please try again later.';

			toast.error(message);

			return Promise.reject(new Error(message));
		}

		if (error.code === 'ECONNABORTED') {
			const message = 'Request timed out. Please try again.';

			toast.error(message);

			return Promise.reject(new Error(message));
		}

		if (!error.response) {
			const message = 'Unable to connect to the server. Please check your internet connection.';

			toast.error(message);

			return Promise.reject(new Error(message));
		}

		const requestUrl = error.config?.url ?? '';

		const isAuthRequest =
			requestUrl.includes('/login') ||
			requestUrl.includes('/register') ||
			requestUrl.includes('/refresh-token');

		const responseData: unknown = error.response.data;

		const errorMessage =
			typeof responseData === 'string'
				? responseData
				: isErrorResponse(responseData)
					? responseData.message
					: getDefaultErrorMessage(error.response.status);

		toast.error(errorMessage);

		if (error.response.status === 401 && !isAuthRequest) {
			localStorage.removeItem('token');

			window.location.assign('/login');
		}

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

const getDefaultErrorMessage = (status: number): string => {
	switch (status) {
		case 400:
			return 'The request was invalid. Please check your information.';
		case 401:
			return 'Your session has expired. Please log in again.';
		case 403:
			return 'You do not have permission to perform this action.';
		case 404:
			return 'The requested resource could not be found.';
		case 409:
			return 'A conflict occurred while processing your request.';
		case 500:
			return 'A server error occurred. Please try again later.';
		default:
			return 'Something went wrong. Please try again later.';
	}
};

export default axiosInstance;
