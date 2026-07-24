import type { Method } from 'axios';
import type { BuildAxiosCallOptions, BuildCallFunction, HttpMethod } from '../api/axiosCallTypes';

/**
 * A higher order function to enhance buildAxiosCall with default cancel token and requestId handling.
 * @param buildCallFunc The buildAxiosCall function to enhance.
 * @returns A new function with enhanced capabilities.
 */
export function withCancelToken<R, T>(buildCallFunc: BuildCallFunction<R, T>) {
	return async (method: Method, endpoint: string, data?: T, options?: BuildAxiosCallOptions) => {
		const controller = new AbortController();

		return buildCallFunc(method.toLocaleUpperCase() as HttpMethod, endpoint, data, {
			...options,
			signal: options?.signal ?? controller.signal,
		});
	};
}
