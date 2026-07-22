import type { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import toast from 'react-hot-toast';
import { withCancelToken } from '../utils/withCancel';
import axiosInstance from './axiosInstance';

interface BuildAxiosCallOptions {
	params?: AxiosRequestConfig['params'];
	signal?: AbortSignal;
	configs?: AxiosRequestConfig;
	cancelToken?: CancelToken;
	thunkId?: string;
	showSuccessToast?: boolean;
	showErrorToast?: boolean;
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

		if (showSuccessToast && thunkId) {
			toast.success(`${getThunkDisplayName(thunkId)} successful`);
		}

		return response;
	} catch (error: unknown) {
		if (showErrorToast) {
			const errorMessage =
				error instanceof Error
					? error.message
					: thunkId
						? `Failed ${getThunkDisplayName(thunkId)}`
						: 'Something went wrong. Please try again later.';

			toast.error(errorMessage);
		}

		throw error;
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
 * Extracts the display name from a thunk ID.
 *
 * Example:
 * CREATE-User Login -> User Login
 */
const getThunkDisplayName = (thunkId: string): string => {
	const separatorIndex = thunkId.indexOf('-');

	if (separatorIndex === -1) return thunkId.trim();

	return thunkId.slice(separatorIndex + 1).trim();
};
