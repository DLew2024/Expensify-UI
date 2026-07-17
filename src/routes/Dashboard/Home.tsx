import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import styles from './styles/_Home.module.scss';

const Home = () => {
	useUserAuth();

	// const [dashboardData, setDashboardData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchDashboardData = async () => {
		if (isLoading) return;

		setIsLoading(true);

		// Implement to return Dashboard Data
		// try {
		// 	const { data } = await dispatch(getUserDashboardData).unwrap();

		// 	if (data) {
		// 		setDashboardData(data);
		// 	}
		// } catch (error) {
		// 	console.log('Something went wrong. Please try again.', error);
		// } finally {
		// 	setIsLoading(false);
		// }

		setIsLoading(false);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Don't need deps>
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
