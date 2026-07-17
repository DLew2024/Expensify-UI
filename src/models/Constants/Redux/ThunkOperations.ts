/**
 * This is meant to go in thunk IDs. You can find examples throughout the app.
 * For quick reference, is an example of a proper ID:
 *
 * ```
 * `${ThunkOperation.GET}-Documents-By Id`
 * ```
 * - The thunk operation determines the verb displayed when the loading indicator is displayed.
 * - The middleware parses the ID by the dashes, so only ever have 2 dashes max, 1 minimum.
 * - After the first dash is the subject, or what is the thunk saving, loading, etc
 * - After the second dash is the description. This is just to help differentiate it from other thunks.
 */
export enum ThunkOperation {
	GET = 'GET',
	CREATE = 'CREATE',
	UPSERT = 'UPSERT',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
	PUT = 'PUT',
	PATCH = 'PATCH',
}
