import type { Guid } from '../../../utils/DataTypes/Guid';

export interface CustomBarChartData {
	categoryName: string;
	amount: number;
	month: string;
}

export type CustomLineChartData = {
	categoryId?: Guid;
	date: string;
	amount: number;
};
