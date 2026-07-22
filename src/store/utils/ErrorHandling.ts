interface ErrorResponse {
	message: string;
}

interface ValidationErrorResponse {
	title: string;
	status: number;
	errors: Record<string, string[]>;
}

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'message' in value &&
		typeof value.message === 'string'
	);
};

export const isValidationErrorResponse = (value: unknown): value is ValidationErrorResponse => {
	return (
		typeof value === 'object' &&
		value !== null &&
		'errors' in value &&
		typeof value.errors === 'object' &&
		value.errors !== null
	);
};

export const getValidationErrorMessage = (errors: Record<string, string[]>): string => {
	const messages = Object.values(errors).flat();

	return ['Please correct the following:', ...messages.map((message) => `• ${message}`)].join('\n');
};
