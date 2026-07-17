/**
 * Simple Util to parse a thunkSubject from a Thunk ID
 * @param thunkId
 * @returns parsed Thunk Subject
 */
// const parseSubject = (thunkId: string): string => {
// 	const parts = thunkId.split('-');

// 	if (parts.length > 1) {
// 		parts.shift(); // Remove the first element, which is the ThunkOperation
// 		return parts.join('-'); // Rejoin in case there contained other dashes in the thunk subject
// 	}

// 	return '';
// };

/**
 *  Thunk Subjects that should not have universal feedback components rendered
 */
export const BypassFeedbackThunkSubjects: string[] = [
	// parseSubject(Thunk_ID),
];
