/**
 * Checks for anonymous endpoints.
 */
export const isAuthenticationRequest = (requestUrl: string): boolean => {
	const authenticationEndpoints = ['/login', '/register', '/refresh-token'];
	return authenticationEndpoints.some((endpoint) => requestUrl.includes(endpoint));
};

/**
 * Returns the current JWT access token.
 */
export async function getAuthenticationToken(): Promise<string> {
	return localStorage.getItem('token') ?? '';
}
