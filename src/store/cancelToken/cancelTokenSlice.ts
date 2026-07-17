import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CancelTokenSource } from 'axios';
import { RevokedCallError } from '../utils/RevokedCallError';

interface CancelTokenEntry {
	endpoint: string;
	source: CancelTokenSource;
}

interface CancelTokenState {
	tokens: Record<string, CancelTokenEntry>;
	endpoints: Record<string, string[]>;
}

const initialState: CancelTokenState = {
	tokens: {},
	endpoints: {},
};

const cancelTokenSlice = createSlice({
	name: 'cancelTokens',
	initialState,
	reducers: {
		addCancelToken: (
			state,
			action: PayloadAction<{ requestId: string; endpoint: string; source: CancelTokenSource }>,
		) => {
			const { requestId, endpoint, source } = action.payload;
			state.tokens[requestId] = { endpoint, source };
			if (!state.endpoints[endpoint]) {
				state.endpoints[endpoint] = [];
			}
			const ids = state.endpoints[endpoint];
			ids.push(requestId);
		},
		cancelTokenByEndpoint: (state, action: PayloadAction<string>) => {
			const endpoint = action.payload;
			const requestIds = state.endpoints[endpoint];
			if (requestIds) {
				requestIds.forEach((requestId) => {
					state.tokens[requestId]?.source.cancel(RevokedCallError);
					delete state.tokens[requestId];
				});

				delete state.endpoints[endpoint];
			}
		},
		cancelAllTokens: (state) => {
			Object.values(state.tokens).forEach((token) => {
				token.source.cancel(RevokedCallError);
			});
			state.tokens = {};
			state.endpoints = {};
		},
		removeCancelToken: (state, action: PayloadAction<string>) => {
			const requestId = action.payload;
			const token = state.tokens[requestId];
			if (!token) return;

			token.source.cancel('Cancelled on successful completion');

			const endpoint = token.endpoint;
			const requestIds = state.endpoints[endpoint];
			if (requestIds) {
				const next = requestIds.filter((id) => id !== requestId);
				if (next.length === 0) delete state.endpoints[endpoint];
				else state.endpoints[endpoint] = next;
			}

			delete state.tokens[requestId];
		},
	},
});

export const { addCancelToken, cancelTokenByEndpoint, cancelAllTokens, removeCancelToken } =
	cancelTokenSlice.actions;
export const reducer = cancelTokenSlice.reducer;
