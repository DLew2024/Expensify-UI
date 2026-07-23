import { useEffect, useState } from 'react';
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { DashboardDataResponseDTO } from '../../api/GeneratedDTOs';
import AccountSelector from '../../components/Account/AccountSelector';
import InfoCard from '../../components/Cards/InfoCard';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { getUserAccounts } from '../../store/services/AccountService';
import { getUserDashboardData } from '../../store/services/DashboardService';
import { type AppState, dispatch } from '../../store/store';
import { addThousandsSeparator } from '../../utils/Functions/Conversions/NumberUtils';
import { handleApiError } from '../../utils/Functions/Utility/ApiFunctions';
import styles from './styles/_Home.module.scss';

const Home = () => {
	useUserAuth();

	const navigate = useNavigate();
	const $selectedAccountId = useSelector((state: AppState) => state.accounts.selectedAccountId);
	const $selectedAccount = useSelector((state: AppState) => state.accounts.selectedAccount);
	const $accountsStatus = useSelector((state: AppState) => state.accounts.status);

	const [dashboardData, setDashboardData] = useState<DashboardDataResponseDTO | null>(null);

	useEffect(() => {
		if ($accountsStatus === 'idle') {
			dispatch(getUserAccounts());
		}
	}, [$accountsStatus]);

	useEffect(() => {
		if (!$selectedAccountId) return;

		const fetchDashboardData = async () => {
			try {
				const dashboardData = await dispatch(getUserDashboardData($selectedAccountId)).unwrap();

				setDashboardData(dashboardData);
			} catch (error: unknown) {
				handleApiError(error, 'Error loading dashboard data:');
			}
		};

		fetchDashboardData();
	}, [$selectedAccountId]);

	return (
		<DashboardLayout activeMenu="Dashboard">
			<div className={styles.dashboard}>
				<AccountSelector />

				<div className={styles.dashboard__cards}>
					<InfoCard
						icon={<IoMdCard />}
						label={$selectedAccount ? $selectedAccount.name : 'Total Balance'}
						value={addThousandsSeparator(
							$selectedAccount?.currentBalance ?? dashboardData?.totalBalance ?? 0,
						)}
						variant="primary"
					/>

					<InfoCard
						icon={<LuWalletMinimal />}
						label="Total Income"
						value={addThousandsSeparator(dashboardData?.totalIncome ?? 0)}
						variant="success"
					/>

					<InfoCard
						icon={<LuHandCoins />}
						label="Total Expense"
						value={addThousandsSeparator(dashboardData?.totalExpenses ?? 0)}
						variant="danger"
					/>
				</div>

				<div className={styles.dashboard__contentGrid}>
					<RecentTransactions
						transactions={dashboardData?.recentTransactions ?? []}
						onSeeMore={() => navigate('/expense')}
					/>

					<FinanceOverview
						totalBalance={dashboardData?.totalBalance ?? 0}
						totalIncome={dashboardData?.totalIncome ?? 0}
						totalExpenses={dashboardData?.totalExpenses ?? 0}
					/>

					<ExpenseTransactions
						transactions={dashboardData?.last30DaysOfExpenses?.transactions}
						onSeeMore={() => navigate('/expense')}
					/>

					<Last30DaysExpenses
						data={dashboardData?.last30DaysOfExpenses?.transactions ?? []}
						onSeeMore={() => navigate('/expense')}
					/>

					<RecentIncomeWithChart
						data={dashboardData?.last60DaysOfIncome?.transactions?.slice(0, 4) ?? []}
						totalIncome={dashboardData?.totalIncome ?? 0}
					/>

					<RecentIncome
						transactions={dashboardData?.last60DaysOfIncome?.transactions ?? []}
						onSeeMore={() => navigate('/income')}
					/>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Home;
