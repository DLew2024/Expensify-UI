import { useEffect, useState } from 'react';
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { DashboardDataResponseDTO } from '../../api/GeneratedDTOs';
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
import { setAccounts, setSelectedAccountId } from '../../store/slices/accountsSlice';
import { type AppState, dispatch } from '../../store/store';
import { addThousandsSeparator } from '../../utils/Functions/Conversions/NumberUtils';
import AccountSelector from './AccountsSelector';
import styles from './styles/_Home.module.scss';

const Home = () => {
	useUserAuth();

	const navigate = useNavigate();
	const $userAccounts = useSelector((state: AppState) => state.accounts.accounts);
	const $selectedAccountId = useSelector((state: AppState) => state.accounts.selectedAccountId);
	const $selectedAccount =
		$userAccounts.find((account) => account.id === $selectedAccountId) ?? null;

	const [dashboardData, setDashboardData] = useState<DashboardDataResponseDTO | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchDashboardData = async () => {
		if (isLoading) return;

		setIsLoading(true);

		try {
			const dashboardData = await dispatch(getUserDashboardData()).unwrap();

			if (dashboardData) {
				setDashboardData(dashboardData);
			}

			const accounts = await dispatch(getUserAccounts()).unwrap();

			if (accounts) {
				dispatch(setAccounts(accounts));
			}
		} catch (error) {
			console.log('Something went wrong. Please try again.', error);
		} finally {
			setIsLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: initial page load
	useEffect(() => {
		fetchDashboardData();
	}, []);

	return (
		<DashboardLayout activeMenu="Dashboard">
			<div className={styles.dashboard}>
				<AccountSelector
					accounts={$userAccounts}
					selectedAccountId={$selectedAccountId}
					onChange={(account) => {
						dispatch(setSelectedAccountId(account?.id ?? null));
					}}
				/>

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
