import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { EpochMillis, EpochSeconds } from '../../DataTypes/DateTypes';

export const formatDateTimeSafe = (dateString?: string, fallback = 'N/A'): string => {
	if (!dateString) return fallback;

	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return fallback;

	return date.toLocaleString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};

export const dateToEpochSeconds = (date: Date | number): EpochSeconds => {
	const milliseconds = typeof date === 'number' ? date : date.getTime();
	return epochMillisToSeconds(milliseconds);
};

export const formatEpochSecondsSafe = (
	epochSeconds?: EpochSeconds | number,
	fallback = 'N/A',
): string => {
	if (typeof epochSeconds !== 'number') return fallback;

	const date = new Date(epochSeconds * 1000);
	if (Number.isNaN(date.getTime())) return fallback;

	return date.toLocaleString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

export const dayjsToEpochSecondsSafeOrUndefined = (
	date: Dayjs | null,
): EpochSeconds | undefined => {
	return date ? (date.unix() as EpochSeconds) : undefined;
};

export const dayjsToEpochSecondsSafeOrNowEpochSeconds = (date: Dayjs | null): EpochSeconds => {
	return (date ?? dayjs()).unix() as EpochSeconds;
};

export const epochToDayjsOrUndefined = (epochSeconds?: number): Dayjs | undefined =>
	epochSeconds ? dayjs.unix(epochSeconds) : undefined;

export const epochToDayjsOrNull = (epochSeconds?: number): Dayjs | null =>
	epochSeconds ? dayjs.unix(epochSeconds) : null;

export const epochSecondsToMillis = (epochSeconds: EpochSeconds | number): EpochMillis => {
	return (epochSeconds * 1000) as EpochMillis;
};

export const epochMillisToSeconds = (epochMilliSeconds: EpochMillis | number): EpochSeconds => {
	return Math.floor(epochMilliSeconds / 1000) as EpochSeconds;
};
