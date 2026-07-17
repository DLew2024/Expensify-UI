import axios, { type AxiosRequestConfig, type AxiosResponse, type CancelToken } from 'axios';
import { withCancelToken } from './utils/withCancel';

const baseUrl: string =
	import.meta.env.MODE === 'production' ? '' : import.meta.env.VITE_API_DEVELOPMENT_URL;
const authConfigs = undefined;

const auth = authConfigs === undefined ? undefined : undefined;

export async function getAuthenticationToken(): Promise<string> {
	if (auth === undefined) {
		return '';
	}

	return '';
}

/**
 * Builds an Axios config object containing the Authorization header for the current authenticated user
 */
async function buildAxiosConfig(
	signal?: AbortSignal,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: any,
	configs?: AxiosRequestConfig,
): Promise<AxiosRequestConfig> {
	// get authentication token
	const jwtToken = await getAuthenticationToken();

	if (signal) {
		return {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
			signal: signal,
			params,
			...configs,
		};
	}
	if (params?.headers) {
		return {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				...params.headers,
			},
			...configs,
		};
	}
	return {
		headers: {
			Authorization: `Bearer ${jwtToken}`,
		},
		params,
		...configs,
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: any,
	signal?: AbortSignal,
	configs?: AxiosRequestConfig,
	cancelToken?: CancelToken,
): Promise<AxiosResponse<R>> {
	// build url
	const url = `${baseUrl}${endpoint}`;

	// build config object
	const config = await buildAxiosConfig(signal, params, configs);

	const correctedConfig = {
		...config,
		cancelToken: cancelToken,
	};

	switch (method) {
		case 'GET':
		default:
			return axios.get<R>(url, correctedConfig);
		case 'POST':
			return axios.post<T, AxiosResponse<R>>(url, data, correctedConfig);
		case 'PUT':
			return axios.put<T, AxiosResponse<R>>(url, data, correctedConfig);
		case 'DELETE':
			return axios.delete<R>(url, {
				...correctedConfig,
				data,
			});
		case 'PATCH':
			return axios.patch<T, AxiosResponse<R>>(url, data, correctedConfig);
	}
}

/**
 * Builds an Axios GET, POST, or PUT of the specified type T and return type R
 * @param method GET, POST, or PUT
 * @param endpoint Api endpoint to call
 * @param params Optional params for config
 * @param data Data to pass to endpoint for POST or PUT calls
 */
export const buildAxiosCall = withCancelToken(buildAxiosCallBase);
