import type { ComponentType } from 'react';
import LoginPage from '../../routes/Auth/Login/LoginPage';
import SignUpPage from '../../routes/Auth/SignUp/SignUpPage';
import Account from '../../routes/Dashboard/Account';
import Expense from '../../routes/Dashboard/Expense';
import Home from '../../routes/Dashboard/Home';
import Income from '../../routes/Dashboard/Income';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import { NavigationRoutePaths } from './NavigationRoutePaths';

interface AppRoute {
	path: string;
	caseSensitive?: boolean;
	isHidden?: boolean;
	requiresAccount?: boolean;
	Component: ComponentType;
}

export const appRoutes: AppRoute[] = [
	{
		path: NavigationRoutePaths.LOGIN,
		caseSensitive: true,
		Component: LoginPage,
	},
	{
		path: NavigationRoutePaths.SIGN_UP,
		caseSensitive: true,
		Component: SignUpPage,
	},
	{
		path: NavigationRoutePaths.ACCOUNT,
		caseSensitive: true,
		Component: Account,
	},
	{
		path: NavigationRoutePaths.DASHBOARD,
		caseSensitive: true,
		Component: Home,
	},
	{
		path: NavigationRoutePaths.INCOME,
		caseSensitive: true,
		requiresAccount: true,
		Component: Income,
	},
	{
		path: NavigationRoutePaths.EXPENSE,
		caseSensitive: true,
		requiresAccount: true,
		Component: Expense,
	},
	{
		path: NavigationRoutePaths.NOT_FOUND,
		Component: NotFoundPage,
	},
];
