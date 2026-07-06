import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../context/userContext';
import { SIDE_MENU_DATA } from '../../utils/Functions/Utility/SideMenuData';
import { NavigationRoutePaths } from '../../utils/Navigation/NavigationRoutePaths';
import CharAvatar from '../Cards/CharAvatar';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_SideMenu.module.scss';

interface SideMenuProps {
	activeMenu: string;
}

const SideMenu = ({ activeMenu }: SideMenuProps) => {
	const navigate = useNavigate();
	const { user, clearUser } = useUserContext();

	const handleClick = (route: string) => {
		if (route === NavigationRoutePaths.LOGOUT) {
			handleLogout();
			return;
		}

		navigate(route);
	};

	const handleLogout = () => {
		localStorage.clear();
		clearUser();
		navigate(NavigationRoutePaths.LOGIN);
	};

	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebar__profilePictureContainer}>
				{user?.profilePictureUrl ? (
					<img
						className={styles.sidebar__profilePictureContainer__image}
						src={user.profilePictureUrl || ''}
						alt="Profile Photograph"
					/>
				) : (
					<CharAvatar
						className={styles.sidebar__profilePictureContainer__defaultIcon}
						fullName={user?.fullName}
					/>
				)}

				<MainTextTypography
					variant="h5"
					className={styles.sidebar__profilePictureContainer__header}
				>
					{user?.fullName || ''}
				</MainTextTypography>
			</div>

			{SIDE_MENU_DATA.map((item) => (
				<button
					key={item.label}
					className={clsx(styles.menu_item, activeMenu === item.label && styles.selectedMenuItem)}
					onClick={() => handleClick(item.path)}
					type="button"
				>
					<item.icon className={styles.menu_item__icon} />
					{item.label}
				</button>
			))}
		</div>
	);
};

export default SideMenu;
