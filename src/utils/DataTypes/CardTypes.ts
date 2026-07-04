export const SmallCardType = {
	INCOME: 'income',
	EXPENSES: 'expenses',
	SAVINGS: 'savings',
	INVESTMENTS: 'investments',
} as const;

export type SmallCardType = (typeof SmallCardType)[keyof typeof SmallCardType];
