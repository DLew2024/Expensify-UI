import type { IconType } from 'react-icons/lib';
import { LuHandCoins, LuLayoutDashboard, LuLogOut, LuWalletMinimal } from 'react-icons/lu';
import { NavigationRoutePaths } from '../../Navigation/NavigationRoutePaths';

type SideMenuData = {
	id: string;
	label: string;
	icon: IconType;
	path: string;
};

export const SIDE_MENU_DATA: SideMenuData[] = [
	{
		id: '01',
		label: 'Dashboard',
		icon: LuLayoutDashboard,
		path: NavigationRoutePaths.DASHBOARD,
	},
	{
		id: '02',
		label: 'Income',
		icon: LuWalletMinimal,
		path: NavigationRoutePaths.INCOME,
	},
	{
		id: '03',
		label: 'Expense',
		icon: LuHandCoins,
		path: NavigationRoutePaths.EXPENSE,
	},
	{
		id: '06',
		label: 'Logout',
		icon: LuLogOut,
		path: NavigationRoutePaths.LOGOUT,
	},
];
