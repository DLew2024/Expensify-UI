import type { Guid } from '../../../utils/DataTypes/Guid';

export type ExpenseChartData = {
	date: string;
	amount: number;
	categoryId?: Guid;
}[];

export type IncomeBarChartData = {
	date: string;
	amount: number;
	merchant?: string;
}[];

export interface ExpenseBarChartDataItem {
	categoryName?: string;
	amount: number;
}

export interface IncomeProperties {
	icon: string;
	source: string;
	amount: string;
	date: string;
}

export enum TransactionType {
	Expense = 0,
	Income = 1,
	Transfer = 2,
}
