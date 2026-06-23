import type { ComponentType } from 'react';
import LoginPage from '../../components/layouts/LoginPage';
import AddExpensePage from '../../routes/AddExpensePage/AddExpensePage';
import SignUp from '../../routes/Auth/SignUp/SignUp';
import CreateBudgetPage from '../../routes/CreateBudgetPage/CreateBudgetPage';
import Expense from '../../routes/Dashboard/Expense';
import ExpenseDashBoardPage from '../../routes/Dashboard/ExpenseDashboard';
import Home from '../../routes/Dashboard/Home';
import Income from '../../routes/Dashboard/Income';
import EditExpensePage from '../../routes/EditExpensePage/EditExpensePage';
import HelpExpensePage from '../../routes/HelpPage/HelpPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import { NavigationRoutePaths } from './NavigationRoutePaths';

interface AppRoute {
	path: string;
	caseSensitive?: boolean;
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
		Component: SignUp,
	},
	{
		path: NavigationRoutePaths.DASHBOARD,
		caseSensitive: true,
		Component: Home,
	},
	{
		path: NavigationRoutePaths.INCOME,
		caseSensitive: true,
		Component: Income,
	},
	{
		path: NavigationRoutePaths.EXPENSE,
		caseSensitive: true,
		Component: Expense,
	},
	// {
	// 	path: NavigationRoutePaths.CREATE_PAGE,
	// 	caseSensitive: true,
	// 	Component: AddExpensePage,
	// },
	// {
	// 	path: NavigationRoutePaths.EDIT_PATTERN(),
	// 	caseSensitive: true,
	// 	Component: EditExpensePage,
	// },
	// {
	// 	path: NavigationRoutePaths.BUDGET_PAGE,
	// 	caseSensitive: true,
	// 	Component: CreateBudgetPage,
	// },
	// {
	// 	path: NavigationRoutePaths.HELP_PAGE,
	// 	caseSensitive: true,
	// 	Component: HelpExpensePage,
	// },
	{
		path: NavigationRoutePaths.NOT_FOUND, // Handles invalid routes.. Must always be last
		Component: NotFoundPage,
	},
];
