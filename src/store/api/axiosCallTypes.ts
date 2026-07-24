import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface BuildAxiosCallOptions {
	params?: AxiosRequestConfig['params'];
	signal?: AbortSignal;
	configs?: AxiosRequestConfig;
	thunkId?: string;
	showSuccessToast?: boolean;
	showErrorToast?: boolean;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type BuildCallFunction<R, T> = (
	method: HttpMethod,
	endpoint: string,
	data?: T,
	options?: BuildAxiosCallOptions,
) => Promise<AxiosResponse<R>>;
