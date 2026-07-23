import type { Guid } from '../../../utils/DataTypes/Guid';

export interface CustomBarChartData {
	id?: Guid;
	sourceName: string;
	date: string;
	amount: number;
}

export type CustomLineChartData = {
	id?: Guid;
	date: string;
	amount: number;
};
