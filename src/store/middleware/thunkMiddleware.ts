import type { AsyncThunk, Middleware } from '@reduxjs/toolkit';
import { ThunkOperation } from '../../models/Constants/Redux/ThunkOperations';
import { BypassFeedbackThunkSubjects } from '../../models/Constants/ThunkIds/BypassedThunks';
import {
	addLoadingMessage,
	pushUniversalFeedbackNotification,
	removeLoadingMessage,
} from '../Common/commonSlice';
import { removeCancelToken } from '../cancelToken/cancelTokenSlice';
import { RevokedCallError } from '../utils/RevokedCallError';

export type AsyncThunkLifecycleStatus = ReturnType<
	AsyncThunk<unknown, unknown, any>['pending' | 'fulfilled' | 'rejected']
>['meta']['requestStatus'];

// Made this through trail and error
type MiddlewareActionType = {
	/** Only present if `meta.requestStatus === 'rejected' && meta.aborted === false` */
	error?: {
		message?: string;
		name?: string;
		stack?: string;
	};
	/** Only present if the action is from a Thunk */
	meta?: {
		arg: unknown;
		requestId: string;
		requestStatus: AsyncThunkLifecycleStatus;
		aborted?: boolean;
		condition?: boolean;
		rejectedWithValue?: boolean;
	};
	/**
	 * ### Thunks will be in this format:
	 * ```
	 * type ThunkName = string;
	 * type Status = 'rejected' | 'pending' | 'fulfilled';
	 *
	 * // Example: 'getDocuments/pending'
	 * `${ThunkName}/${Status}`;
	 * ```
	 *
	 * ### Reducers will be in this format:
	 * ```
	 * `${ThunkName}`;
	 * ```
	 */
	type: string;
	payload?: unknown;
};

const isMiddlewareAction = (action: unknown): action is MiddlewareActionType => {
	if (typeof action !== 'object' || action === null) {
		return false;
	}

	return 'type' in action && typeof action.type === 'string';
};

export const thunkMiddleware: Middleware = (api) => (next) => (action) => {
	if (!isMiddlewareAction(action)) {
		return next(action);
	}

	// The action is not from a thunk, so we don't care about it
	if (action.meta === undefined) {
		return next(action);
	}

	const requestStatus = action.meta.requestStatus;
	const requestId = action.meta.requestId;
	const thunkNameParts = action.type.split('/')[0]?.split('-') ?? [];
	const thunkId = action.type.split('/')[0] ?? '';
	/**
	 * Thunk name format: 'method-subject-extra/state'
	 * Example:
	 * - 'GET-Documents-By Id/pending'
	 */
	const thunkOperation = thunkNameParts[0] as ThunkOperation;
	const thunkSubject = thunkNameParts[1] ?? '';

	let thunkMethodVerb = '';
	let thunkSuccessVerb = '';
	switch (thunkOperation) {
		case ThunkOperation.GET: {
			thunkMethodVerb = 'Loading';
			break;
		}
		case ThunkOperation.CREATE:
		case ThunkOperation.UPSERT:
		case ThunkOperation.UPDATE: {
			thunkMethodVerb = 'Saving';
			thunkSuccessVerb = 'saved';
			break;
		}
		case ThunkOperation.DELETE: {
			thunkMethodVerb = 'Deleting';
			thunkSuccessVerb = 'deleted';
			break;
		}
	}

	const loadingMessage = `${thunkMethodVerb} ${thunkSubject}`;

	switch (requestStatus) {
		case 'pending': {
			api.dispatch(
				addLoadingMessage({
					id: thunkId,
					message: loadingMessage,
				}),
			);

			break;
		}
		case 'rejected': {
			api.dispatch(
				removeLoadingMessage({
					id: thunkId,
					message: loadingMessage,
				}),
			);

			api.dispatch(removeCancelToken(requestId));

			// Action was aborted if this is true, so not actually 'rejected'
			if (action.meta.aborted) {
				break;
			}

			if (BypassFeedbackThunkSubjects.includes(thunkSubject)) {
				break;
			}

			// Do not render if error was due to call being revoked
			if (action.error?.message === RevokedCallError) {
				break;
			}

			api.dispatch(
				pushUniversalFeedbackNotification({
					message: `Error while ${thunkMethodVerb} ${thunkSubject}`,
					severity: 'error',
				}),
			);

			break;
		}
		case 'fulfilled': {
			api.dispatch(
				removeLoadingMessage({
					id: thunkId,
					message: loadingMessage,
				}),
			);

			if (BypassFeedbackThunkSubjects.includes(thunkSubject)) {
				break;
			}

			if (thunkOperation !== ThunkOperation.GET) {
				api.dispatch(
					pushUniversalFeedbackNotification({
						message: `${thunkSubject} ${thunkSuccessVerb} successfully`,
						severity: 'success',
					}),
				);
			}

			break;
		}
	}

	return next(action);
};
