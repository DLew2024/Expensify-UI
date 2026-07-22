import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import type {
	QueuedFeedback,
	UniversalFeedbackComponentInput,
} from '../../models/Types/Redux/UniversalFeedbackState';
import type { Guid } from '../../utils/DataTypes/Guid';

interface CommonState {
	universalFeedbackQueue: QueuedFeedback[];
	loadingMessages: {
		message: string;
		id: string;
	}[];
}

const INITIAL_STATE: CommonState = {
	universalFeedbackQueue: [],
	loadingMessages: [],
};

const slice = createSlice({
	name: 'commonSlice',
	initialState: INITIAL_STATE,
	reducers: {
		pushUniversalFeedbackNotification(
			state,
			{ payload }: PayloadAction<UniversalFeedbackComponentInput>,
		) {
			state.universalFeedbackQueue.push({
				id: v4() as Guid,
				createdAt: Date.now(),
				...payload,
			});
		},
		popUniversalFeedbackNotification(
			state,
			{ payload }: PayloadAction<{ id?: string } | undefined>,
		) {
			if (payload?.id) {
				state.universalFeedbackQueue = state.universalFeedbackQueue.filter(
					(n) => n.id !== payload.id,
				);
			} else {
				state.universalFeedbackQueue.shift();
			}
		},

		removeLoadingMessage(
			state,
			{ payload }: PayloadAction<CommonState['loadingMessages'][number]>,
		) {
			const idx = state.loadingMessages.findIndex((message) => message.id === payload.id);
			if (idx !== -1) state.loadingMessages.splice(idx, 1);
		},

		addLoadingMessage(state, { payload }: PayloadAction<CommonState['loadingMessages'][number]>) {
			state.loadingMessages.push(payload);
		},
	},
});

export const reducer = slice.reducer;

export const {
	popUniversalFeedbackNotification,
	pushUniversalFeedbackNotification,
	addLoadingMessage,
	removeLoadingMessage,
} = slice.actions;
