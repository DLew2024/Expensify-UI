import axios from 'axios';

interface ApiErrorResponse {
	message?: string;
}

export const handleApiError = (error: unknown, context = 'Request failed') => {
	if (axios.isAxiosError<ApiErrorResponse>(error)) {
		console.error(context, error.response?.data?.message ?? error.message);
		return;
	}

	if (error instanceof Error) {
		console.error(context, error.message);
		return;
	}

	console.error(context, error);
};
