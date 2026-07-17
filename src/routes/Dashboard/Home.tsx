import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import styles from './styles/_Home.module.scss';

const Home = () => {
	useUserAuth();

	const [dashboardData, setDashboardData] = useState(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchDashboardData = async () => {
		if (isLoading) return;

		setIsLoading(true);

		try {
			const { data } = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

			if (data) {
				setDashboardData(data);
			}
		} catch (error) {
			console.log('Something went wrong. Please try again.', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchDashboardData();
		return () => {};
	}, []);

	return (
		<DashboardLayout activeMenu="Dashboard">
			<div className={styles.home_container}>Home</div>
		</DashboardLayout>
	);
};

export default Home;
