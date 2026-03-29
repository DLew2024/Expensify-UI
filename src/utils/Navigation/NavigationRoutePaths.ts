export const NavigationRoutePaths = {
	ROOT: '/',
	LOGIN: '/login',
	SIGN_UP: '/signUp',
	DASHBOARD: '/dashboard',
	INCOME: '/income',
	EXPENSE: '/expense',
	CREATE_PAGE: '/create',
	BUDGET_PAGE: '/budget',
	EDIT_PATTERN: (id?: string) => `/edit/${id ?? `:id`}`,
	HELP_PAGE: '/help',
	NOT_FOUND: '*', // Handles invalid routes.
} as const;

export const buildEditPath = (id: string | number) => `/edit/${id}`;
