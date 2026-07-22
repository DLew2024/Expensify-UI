import axios, { type InternalAxiosRequestConfig } from 'axios';
import {
	getAuthenticationToken,
	isAuthenticationRequest,
} from '../store/utils/AuthenticationUtils';
import { getValidationErrorMessage, isValidationErrorResponse } from '../store/utils/ErrorHandling';
import { shouldBypassAuth } from './Development/Dev';

interface ErrorResponse {
	message: string;
}

const baseUrl = import.meta.env.MODE === 'production' ? '' : 'http://localhost:5073';

const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

/**
 * Adds the current JWT token to every outgoing request.
 */
axiosInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const jwtToken = await getAuthenticationToken();

		if (jwtToken) {
			config.headers.Authorization = `Bearer ${jwtToken}`;
		}

		return config;
	},
	(error: unknown) => Promise.reject(error),
);

/**
 * Converts Axios failures into consistent Error objects.
 */
axiosInstance.interceptors.response.use(
	(response) => response,
	(error: unknown) => {
		if (!axios.isAxiosError(error)) {
			return Promise.reject(
				new Error(
					'An unexpected application error occurred while processing your request. Please try again.',
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

		const requestUrl = error.config?.url ?? '';
		const isAuthRequest = isAuthenticationRequest(requestUrl);
		const status = error.response.status;
		const responseData: unknown = error.response.data;

		if (status === 401 && !isAuthRequest && !shouldBypassAuth()) {
			// Remove once in production
			localStorage.removeItem('token');
			window.location.assign('/login');
		}

		const errorMessage =
			typeof responseData === 'string' && responseData.trim()
				? responseData
				: isValidationErrorResponse(responseData)
					? getValidationErrorMessage(responseData.errors)
					: isErrorResponse(responseData)
						? responseData.message
						: getDefaultErrorMessage(status);

		return Promise.reject(new Error(errorMessage));
	},
);

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
