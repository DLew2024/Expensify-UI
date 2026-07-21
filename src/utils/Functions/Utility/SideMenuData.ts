import type { IconType } from 'react-icons/lib';
import { LuHandCoins, LuLayoutDashboard, LuLogOut, LuWalletMinimal } from 'react-icons/lu';
import { RiAccountBoxLine } from 'react-icons/ri';
import { NavigationRoutePaths } from '../../Navigation/NavigationRoutePaths';

type SideMenuData = {
	label: string;
	icon: IconType;
	path: string;
};

export const SIDE_MENU_DATA: SideMenuData[] = [
	{
		label: 'Dashboard',
		icon: LuLayoutDashboard,
		path: NavigationRoutePaths.DASHBOARD,
	},
	{
		label: 'Accounts',
		icon: RiAccountBoxLine,
		path: NavigationRoutePaths.ACCOUNT,
	},
	{
		label: 'Income',
		icon: LuWalletMinimal,
		path: NavigationRoutePaths.INCOME,
	},
	{
		label: 'Expense',
		icon: LuHandCoins,
		path: NavigationRoutePaths.EXPENSE,
	},
	{
		label: 'Logout',
		icon: LuLogOut,
		path: NavigationRoutePaths.LOGOUT,
	},
];
