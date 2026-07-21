import type { Guid } from './Guid';

export interface DeleteAlertState {
	show: boolean;
	data: Guid | null;
}
