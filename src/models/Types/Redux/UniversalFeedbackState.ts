import type { AlertColor } from '@mui/material';
import type { ActionCreatorWithoutPayload, AsyncThunk } from '@reduxjs/toolkit';
import type { Guid } from '../../../utils/DataTypes/Guid';

export interface UniversalFeedbackComponentInput {
	message: string;
	severity: AlertColor;
	buttons?: FeedbackButton[];
}

export interface QueuedFeedback extends UniversalFeedbackComponentInput {
	id: Guid;
	createdAt: number;
}

interface FeedbackButton {
	label: string;
	reducer: AsyncThunk<any, undefined, any> | ActionCreatorWithoutPayload | undefined;
	action: VoidFunction | undefined;
}
