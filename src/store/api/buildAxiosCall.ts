import type { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import toast from 'react-hot-toast';
import { ThunkOperation } from '../../models/Constants/Redux/ThunkOperations';
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

		const successMessage = getThunkSuccessMessage(thunkId);

		if (showSuccessToast && successMessage) {
			toast.success(successMessage);
		}

		return response;
	} catch (error: unknown) {
		if (showErrorToast) {
			const errorMessage =
				error instanceof Error
					? error.message
					: (getThunkErrorMessage(thunkId) ?? 'Something went wrong. Please try again later.');

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

const getThunkSuccessMessage = (thunkId?: string): string | null => {
	if (!thunkId) return null;

	const separatorIndex = thunkId.indexOf('-');

	if (separatorIndex === -1) return null;

	const operation = thunkId.slice(0, separatorIndex) as ThunkOperation;
	const displayName = thunkId.slice(separatorIndex + 1).trim();

	switch (operation) {
		case ThunkOperation.CREATE:
			return `${displayName} created successfully.`;

		case ThunkOperation.DELETE:
			return `${displayName} deleted successfully.`;

		case ThunkOperation.UPDATE:
		case ThunkOperation.PUT:
		case ThunkOperation.PATCH:
		case ThunkOperation.UPSERT:
			return `${displayName} updated successfully.`;

		case ThunkOperation.GET:
		default:
			return null;
	}
};

const getThunkErrorMessage = (thunkId?: string): string | null => {
	if (!thunkId) return null;

	const separatorIndex = thunkId.indexOf('-');

	if (separatorIndex === -1) return null;

	const operation = thunkId.slice(0, separatorIndex) as ThunkOperation;
	const displayName = thunkId.slice(separatorIndex + 1).trim();

	switch (operation) {
		case ThunkOperation.CREATE:
			return `Failed to create ${displayName.toLowerCase()}.`;

		case ThunkOperation.DELETE:
			return `Failed to delete ${displayName.toLowerCase()}.`;

		case ThunkOperation.UPDATE:
		case ThunkOperation.PUT:
		case ThunkOperation.PATCH:
		case ThunkOperation.UPSERT:
			return `Failed to update ${displayName.toLowerCase()}.`;

		case ThunkOperation.GET:
		default:
			return null;
	}
};
