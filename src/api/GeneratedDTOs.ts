/* AUTO-GENERATED - DO NOT EDIT */

import type { Guid } from '../utils/DataTypes/Guid';

export type CurrencyCode = number;

export type TransactionPostedStatus = number;

export type LogoutScope = number;

export type TransactionType = number;

export type AccountResponseDTO = {
	/** Format: uuid */
	id: Guid;
	name: string;
	institutionName?: string;
	lastFourDigits?: string;
	/** Format: uuid */
	accountTypeId?: Guid;
	accountTypeName?: string;
	currencyCode?: CurrencyCode;
	/** Format: double */
	currentBalance?: number;
	/** Format: double */
	availableBalance?: number;
	includeInNetWorth?: boolean;
	isActive?: boolean;
	isHidden?: boolean;
	/** Format: double */
	creditLimit?: null | number;
	/** Format: double */
	interestRate?: null | number;
	notes?: string;
};

export type AddExpenseTransactionDTO = {
	icon: string;
	category: string;
	/** Format: int32 */
	amount: number;
	/** Format: int64 */
	date: number;
};

export type AddIncomeTransactionDTO = {
	/** Format: uuid */
	accountId: Guid;
	/** Format: uuid */
	budgetId?: null | Guid;
	/** Format: uuid */
	categoryId?: null | Guid;
	/** Format: double */
	amount: number;
	/** Format: int64 */
	transactionDate: number;
	description: string;
	source: string;
	notes?: null | string;
	isRecurring?: boolean;
	/** Format: uuid */
	paymentMethodId?: null | Guid;
	tags?: string[];
	icon?: string;
};

export type CategoryDTO = {
	/** Format: uuid */
	id?: Guid;
	name?: string;
};

export type ChangePasswordDTO = {
	currentPassword?: string;
	newPassword?: string;
	confirmNewPassword?: string;
};

export type CreateAccountDTO = {
	name: string;
	/** Format: uuid */
	accountTypeId: Guid;
	institutionName: string;
	lastFourDigits: string;
	currencyCode: CurrencyCode;
	/** Format: double */
	initialBalance: number;
	includeInNetWorth?: boolean;
	/** Format: double */
	creditLimit?: number;
	/** Format: double */
	interestRate?: number;
	notes?: string;
	icon?: string;
};

export type CreateAccountResponseDTO = {
	/** Format: uuid */
	accountId?: Guid;
	name?: string;
	/** Format: uuid */
	accountTypeId?: Guid;
	accountTypeName?: string;
	institutionName?: null | string;
	lastFourDigits?: null | string;
	currencyCode?: CurrencyCode;
	/** Format: double */
	currentBalance?: number;
	/** Format: double */
	availableBalance?: number;
	includeInNetWorth?: boolean;
	isActive?: boolean;
	isHidden?: boolean;
	notes?: null | string;
	/** Format: double */
	creditLimit?: null | number;
	/** Format: double */
	interestRate?: null | number;
	/** Format: int64 */
	createDate?: number;
};

export type DashboardDataResponseDTO = {
	/** Format: double */
	totalBalance: number;
	/** Format: double */
	totalIncome: number;
	/** Format: double */
	totalExpenses: number;
	last30DaysOfExpenses?: null | TransactionPeriodSummaryDTO;
	last60DaysOfExpenses?: null | TransactionPeriodSummaryDTO;
	last30DaysOfIncome?: null | TransactionPeriodSummaryDTO;
	last60DaysOfIncome?: null | TransactionPeriodSummaryDTO;
	recentTransactions?: TransactionDTO[];
};

export type DownloadExpenseExcelDTO = {
	/** Format: uuid */
	userId?: Guid;
};

export type EmailVerificationDTO = {
	token?: string;
};

export type ExpenseTransactionResponseDTO = Record<string, never>;

export type ForgotPasswordDTO = {
	email: string;
};

export type GetExpenseIncomeDTO = Record<string, never>;

export type IncomeTransactionResponseDTO = {
	/** Format: uuid */
	transactionId?: Guid;
	/** Format: uuid */
	accountId?: Guid;
	/** Format: double */
	amount?: number;
	/** Format: double */
	accountBalanceAfterTransaction?: number;
	/** Format: int64 */
	transactionDate?: number;
	description?: string;
	merchantName?: string;
	notes?: null | string;
	isRecurring?: boolean;
	status?: TransactionPostedStatus;
	tags?: string[];
};

export type LoginUserDTO = {
	email: string;
	password: string;
};

export type LogoutUserDTO = {
	scope?: LogoutScope;
	refreshToken?: string;
};

export type PaymentMethodDTO = {
	/** Format: uuid */
	id?: Guid;
	name?: string;
};

export type RefreshTokenResponseDTO = {
	accessToken?: string;
	refreshToken?: string;
	/** Format: int32 */
	expiresIn?: number;
};

export type RefreshTokensDTO = {
	refreshToken?: string;
};

export type RegisterUserDTO = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	profileImageURl?: string;
};

export type ResetPasswordDTO = {
	token?: string;
	password?: string;
	confirmPassword?: string;
};

export type TransactionDTO = {
	/** Format: uuid */
	id: Guid;
	/** Format: double */
	amount: number;
	type: TransactionType;
	/** Format: int64 */
	transactionDate: number;
	merchant?: string;
	description?: string;
	notes?: string;
	paymentMethod: PaymentMethodDTO;
	category: CategoryDTO;
	status?: TransactionPostedStatus;
	isRecurring?: boolean;
	/** Format: uuid */
	recurringTransactionId?: Guid;
	tags?: string[];
	icon?: string;
};

export type TransactionPeriodSummaryDTO = {
	/** Format: double */
	totalBalance?: number;
	transactions?: TransactionDTO[];
};

export type UpdateAccountDTO = Record<string, never>;

export type UserResponseDTO = {
	/** Format: uuid */
	id: Guid;
	fullName: string;
	email: string;
	profileImageUrl: string;
};

export type UserTokenResponseDTO = {
	user: UserResponseDTO;
	token: string;
};
