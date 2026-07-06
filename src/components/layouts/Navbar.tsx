import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import MainTextTypography from '../MainTextTypography';
import SideMenu from './SideMenu';
import styles from './styles/_Navbar.module.scss';

interface NavbarProps {
	activeMenu: string;
}

const Navbar = ({ activeMenu }: NavbarProps) => {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false);

	return (
		<div className={styles.navbar_container}>
			<button
				className={styles.sideMenuButton}
				onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
				type="button"
			>
				{isSideMenuOpen ? (
					<HiOutlineX className={styles.menuIcon} />
				) : (
					<HiOutlineMenu className={styles.menuIcon} />
				)}
			</button>

			<MainTextTypography variant="h2" className={styles.navbar_container__header}>
				Expensify
			</MainTextTypography>

			{isSideMenuOpen && (
				<div className={styles.navbar_container__sideMenuContainer}>
					<SideMenu activeMenu={activeMenu} />
				</div>
			)}
		</div>
	);
};

export default Navbar;
