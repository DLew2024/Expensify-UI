export const NavigationRoutePaths = {
	ROOT: '/',
	LOGIN: '/login',
	LOGOUT: '/logout',
	SIGN_UP: '/signUp',
	DASHBOARD: '/dashboard',
	ACCOUNT: '/account',
	INCOME: '/income',
	EXPENSE: '/expense',
	BUDGET_PAGE: '/budget',
	HELP_PAGE: '/help',
	NOT_FOUND: '*',
} as const;

export const buildEditPath = (id: string | number) => `/edit/${id}`;
