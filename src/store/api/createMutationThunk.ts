import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Use when you want POST PUT PATCH or DELETE to return a toast
 */
export const createMutationThunk = <Returned, ThunkArg>(
	thunkId: string,
	payloadCreator: (
		arg: ThunkArg,
		context: {
			thunkId: string;
		},
	) => Promise<Returned>,
) =>
	createAsyncThunk<Returned, ThunkArg>(thunkId, async (arg) => {
		return payloadCreator(arg, { thunkId });
	});
