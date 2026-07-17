import numeral from 'numeral';

export const convertPriceToString = (price: number): string => {
	return numeral(price / 100).format('0,0.00');
};

/**
 * Function to extract purely the path from any endpoint. If Guid exist
 * as part of endpoint path it will be removed.
 * @param endpoint string
 * @returns path of endpoint with any string query params removed.
 */
export function extractPathFromEndpoint(endpoint: string): string {
	let path = endpoint.replace(/\?.*$/, '');

	const guidRegexAsEndingFragment =
		/\/?[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/?/g;

	path = path.replace(guidRegexAsEndingFragment, '/');

	path = path.replace(/\/+/g, '/');

	if (path.endsWith('/') && path.length > 1) {
		path = path.slice(0, -1);
	}

	return path;
}
