import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, {
	type AxiosRequestConfig,
	type AxiosResponse,
	type CancelToken,
	type InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { shouldBypassAuth } from '../utils/Development/Dev';
import { withCancelToken } from './utils/withCancel';

interface ErrorResponse {
	message: string;
}

interface BuildAxiosCallOptions {
	params?: AxiosRequestConfig['params'];
	signal?: AbortSignal;
	configs?: AxiosRequestConfig;
	cancelToken?: CancelToken;
	thunkId?: string;
	showSuccessToast?: boolean;
	showErrorToast?: boolean;
}

const baseUrl = import.meta.env.MODE === 'production' ? '' : 'http://localhost:5073';

const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 10000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
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
		const isAuthRequest = isAuthenticationRequest(requestUrl);

		if (error.response.status === 401 && !isAuthRequest) {
			// Remove once in production
			if (!shouldBypassAuth()) {
				localStorage.removeItem('token');
				window.location.assign('/login');
			}
		}

		if (error.response.status >= 500) {
			console.error('Server error:', error.response.data);
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

/**
 * Builds the Axios request configuration.
 */
function buildAxiosConfig(
	signal?: AbortSignal,
	params?: AxiosRequestConfig['params'],
	configs?: AxiosRequestConfig,
	cancelToken?: CancelToken,
): AxiosRequestConfig {
	return {
		...configs,
		params: params ?? configs?.params,
		signal: signal ?? configs?.signal,
		cancelToken: cancelToken ?? configs?.cancelToken,
		headers: {
			...configs?.headers,
		},
	};
}

/**
 * Builds an Axios GET, POST, or PUT of the specified type T and return type R
 * @param method GET, POST, or PUT
 * @param endpoint Api endpoint to call
 * @param params Optional params for config
 * @param data Data to pass to endpoint for POST or PUT calls
 */
async function buildAxiosCallBase<R, T>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	endpoint: string,
	data?: T,
	options: BuildAxiosCallOptions = {},
): Promise<AxiosResponse<R>> {
	const {
		params,
		signal,
		configs,
		cancelToken,
		thunkId,
		showSuccessToast = true,
		showErrorToast = true,
	} = options;

	const config = buildAxiosConfig(signal, params, configs, cancelToken);
	const thunkDisplayName = getThunkDisplayName(thunkId);

	try {
		let response: AxiosResponse<R>;

		switch (method) {
			case 'GET':
				response = await axiosInstance.get<R>(endpoint, config);
				break;

			case 'POST':
				response = await axiosInstance.post<R, AxiosResponse<R>, T>(endpoint, data, config);
				break;

			case 'PUT':
				response = await axiosInstance.put<R, AxiosResponse<R>, T>(endpoint, data, config);
				break;

			case 'DELETE':
				response = await axiosInstance.delete<R>(endpoint, {
					...config,
					data,
				});
				break;

			case 'PATCH':
				response = await axiosInstance.patch<R, AxiosResponse<R>, T>(endpoint, data, config);
				break;

			default:
				throw new Error(`Unsupported HTTP method: ${method}`);
		}

		if (showSuccessToast) {
			toast.success(`${thunkDisplayName} successful`);
		}

		return response;
	} catch (error: unknown) {
		if (showErrorToast) {
			const errorMessage = error instanceof Error ? error.message : `Failed ${thunkDisplayName}`;

			toast.error(errorMessage);
		}

		throw error;
	}
}

/**
 * Extracts the display name from a thunk ID.
 *
 * Example:
 * CREATE-User Login -> User Login
 */
const getThunkDisplayName = (thunkId?: string): string => {
	if (!thunkId) return 'Operation';

	const separatorIndex = thunkId.indexOf('-');

	if (separatorIndex === -1) return thunkId.trim();

	return thunkId.slice(separatorIndex + 1).trim();
};

const isErrorResponse = (value: unknown): value is ErrorResponse => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'message' in value &&
		typeof value.message === 'string'
	);
};

const isAuthenticationRequest = (requestUrl: string): boolean => {
	const authenticationEndpoints = ['/login', '/register', '/refresh-token'];
	return authenticationEndpoints.some((endpoint) => requestUrl.includes(endpoint));
};

/**
 * Returns the current JWT access token.
 */
export async function getAuthenticationToken(): Promise<string> {
	return localStorage.getItem('token') ?? '';
}

/**
 * Builds an Axios GET, POST, or PUT of the specified type T and return type R
 * @param method GET, POST, or PUT
 * @param endpoint Api endpoint to call
 * @param params Optional params for config
 * @param data Data to pass to endpoint for POST or PUT calls
 */
export const buildAxiosCall = withCancelToken(buildAxiosCallBase);

/**
 * Use when you want POST PUT PATCH or DELETE to return a toast
 */
export const createMutationThunk = <Returned, ThunkArg>(
	thunkId: string,
	payloadCreator: (
		arg: ThunkArg,
		context: {
			thunkId: string;
		},
	) => Promise<Returned>,
) =>
	createAsyncThunk<Returned, ThunkArg>(thunkId, async (arg) => {
		return payloadCreator(arg, { thunkId });
	});
