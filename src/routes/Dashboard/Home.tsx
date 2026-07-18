import { useEffect, useState } from 'react';
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import InfoCard from '../../components/Cards/InfoCard';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { addThousandsSeparator } from '../../utils/Functions/Conversions/NumberUtils';
import styles from './styles/_Home.module.scss';

const Home = () => {
	useUserAuth();
	const navigate = useNavigate();

	const [dashboardData, setDashboardData] = useState<any>(null);
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
			<div className={styles.dashboard}>
				<div className={styles.dashboard__cards}>
					<InfoCard
						icon={<IoMdCard />}
						label="Total Balance"
						value={addThousandsSeparator(dashboardData?.totalBalance)}
						variant="primary"
					/>

					<InfoCard
						icon={<LuWalletMinimal />}
						label="Total Income"
						value={addThousandsSeparator(dashboardData?.totalIncome)}
						variant="success"
					/>

					<InfoCard
						icon={<LuHandCoins />}
						label="Total Expense"
						value={addThousandsSeparator(dashboardData?.totalExpense)}
						variant="danger"
					/>
				</div>

				<div className={styles.dashboard__contentGrid}>
					<RecentTransactions
						transactions={dashboardData?.recentTransaction}
						onSeeMore={() => navigate('/expense')}
					/>

					<FinanceOverview
						totalBalance={dashboardData?.totalBalance || 0}
						totalIncome={dashboardData?.totalIncome || 0}
						totalExpenses={dashboardData?.totalExpense || 0}
					/>

					<ExpenseTransactions
						transactions={dashboardData?.last30DaysExpenses?.transactions || 0}
						onSeeMore={() => navigate('/expense')}
					/>

					<Last30DaysExpenses
						data={dashboardData?.last30DaysExpenses?.transactions || []}
						onSeeMore={() => navigate('/expense')}
					/>

					<RecentIncomeWithChart
						data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
						totalIncome={dashboardData?.totalIncome || 0}
					/>

					<RecentIncome
						transactions={dashboardData?.last60DaysIncome?.transactions || []}
						onSeeMore={() => navigate('/income')}
					/>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Home;
