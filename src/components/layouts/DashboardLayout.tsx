import type React from 'react';
import { useUserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import styles from './styles/_DashboardLayout.module.scss';

interface DashBoardLayout {
	activeMenu: string;
	children?: React.ReactNode;
}

const DashboardLayout = ({ children, activeMenu }: DashBoardLayout) => {
	const { user } = useUserContext();
	return (
		<div className={styles.dashboard_layout}>
			<Navbar activeMenu={activeMenu} />

			{user && (
				<div className={styles.dashboard_layout__container}>
					<div className={styles.dashboard_layout__sideMenu_container}>
						<SideMenu activeMenu={activeMenu} />
					</div>

					<div className={styles.dashboard_layout__main_container}>{children}</div>
				</div>
			)}
		</div>
	);
};

export default DashboardLayout;
