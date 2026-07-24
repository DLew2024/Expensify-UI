import axios, { type AxiosRequestConfig, type AxiosResponse, type CancelToken } from 'axios';
import { v4 } from 'uuid';
import { extractPathFromEndpoint } from '../../utils/Functions/Conversions/StringUtils';
import { useDispatch } from '../hooks';
import { addCancelToken, removeCancelToken } from '../slices/cancelTokenSlice';

/**
 * A higher order function to enhance buildAxiosCall with default cancel token and requestId handling.
 * @param buildCallFunc The buildAxiosCall function to enhance.
 * @returns A new function with enhanced capabilities.
 */
export function withCancelToken<R, T>(
	buildCallFunc: (
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		endpoint: string,
		data?: T,
		// biome-ignore lint/suspicious/noExplicitAny: <Params can be any>
		params?: any,
		signal?: AbortSignal,
		configs?: AxiosRequestConfig,
		cancelToken?: CancelToken,
	) => Promise<AxiosResponse<R>>,
) {
	return async (
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		endpoint: string,
		data?: T,
		// biome-ignore lint/suspicious/noExplicitAny: <Params can be any>
		params?: any,
		signal?: AbortSignal,
		configs?: AxiosRequestConfig,
		cancelToken?: CancelToken,
		requestId?: string,
	): Promise<AxiosResponse<R>> => {
		/*
		 * Must use the hook version of useDispatch to ensure no circular dependency issues when using dispatch within the function.
		 */
		const dispatch = useDispatch();

		// eslint-disable-next-line import/no-named-as-default-member
		const source = cancelToken ? undefined : axios.CancelToken.source();
		const usedToken = cancelToken ? cancelToken : source?.token;

		const finalRequestId = requestId ?? v4();

		const extractedEndpoint = extractPathFromEndpoint(endpoint);

		source &&
			dispatch(
				addCancelToken({ requestId: finalRequestId, endpoint: extractedEndpoint, source: source }),
			);

		// Call the original buildAxiosCall function with the new cancel token
		const response = await buildCallFunc(
			method,
			endpoint,
			data,
			params,
			signal,
			{
				...configs,
			},
			usedToken,
		).then((response) => {
			dispatch(removeCancelToken(finalRequestId));

			return response;
		});

		return response;
	};
}
