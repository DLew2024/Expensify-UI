import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import type { AddIncomeTransactionDTO, TransactionDTO } from '../../api/GeneratedDTOs';
import DeleteAlert from '../../components/DeleteAlert';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import IncomeList from '../../components/Income/IncomeList';
import IncomeOverview from '../../components/Income/IncomeOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import PrimaryModal from '../../components/PrimaryModal';
import { useUserAuth } from '../../hooks/useUserAuth';
import {
	addIncome,
	deleteIncome,
	downloadIncome,
	getAllIncome,
} from '../../store/services/IncomeService';
import { dispatch } from '../../store/store';
import type { Guid } from '../../utils/DataTypes/Guid';
import { handleApiError } from '../../utils/Functions/Utility/ApiFunctions';
import styles from './styles/_Income.module.scss';

interface DeleteAlertState {
	show: boolean;
	data: Guid | null;
}

const Income = () => {
	useUserAuth();

	const [incomeData, setIncomeData] = useState<TransactionDTO[]>([]);
	const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
		show: false,
		data: null,
	});
	const [isAddIncomeModalOpen, setIsOpenAddIncomeModal] = useState<boolean>(false);

	const handleAddIncome = async (income: AddIncomeTransactionDTO) => {
		const { source, amount, transactionDate } = income;

		if (!source.trim()) {
			toast.error('Source is required.');
			return;
		}

		if (!amount || Number.isNaN(amount) || amount <= 0) {
			toast.error('Amount should be a valid number greater than 0.');
			return;
		}

		if (!transactionDate) {
			toast.error('Date is required.');
			return;
		}

		try {
			await dispatch(addIncome(income)).unwrap();

			setIsOpenAddIncomeModal(false);
			toast.success('Income added successfully.');

			await refreshIncomeDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error adding income:');
		}
	};

	const handleDeleteIncome = async (incomeId: Guid) => {
		try {
			await dispatch(deleteIncome(incomeId)).unwrap();

			setOpenDeleteAlert({
				show: false,
				data: null,
			});

			toast.success('Income details deleted successfully.');

			await refreshIncomeDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error deleting income:');
		}
	};

	const handleDownloadIncomeDetails = async () => {
		try {
			const blob = await dispatch(downloadIncome()).unwrap();

			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');

			link.href = url;
			link.setAttribute('download', 'income_details.xlsx');

			document.body.appendChild(link);
			link.click();
			link.remove();

			window.URL.revokeObjectURL(url);
		} catch (error: unknown) {
			handleApiError(error, 'Error downloading income details:');
			toast.error('Failed to download income details. Please try again later.');
		}
	};

	const refreshIncomeDetails = async () => {
		try {
			const response = await dispatch(getAllIncome()).unwrap();
			setIncomeData(response);
		} catch (error: unknown) {
			handleApiError(error, 'Error fetching income details:');
		}
	};

	useEffect(() => {
		const fetchInitialIncome = async () => {
			try {
				const response = await dispatch(getAllIncome()).unwrap();
				setIncomeData(response);
			} catch (error: unknown) {
				handleApiError(error, 'Error fetching income details:');
			}
		};

		fetchInitialIncome();
	}, []);

	return (
		<DashboardLayout activeMenu="Income">
			<div className={styles.incomeDashboard}>
				<div className={styles.incomeDashboard__content}>
					<IncomeOverview
						transactions={incomeData}
						onAddIncome={() => setIsOpenAddIncomeModal(true)}
					/>

					<IncomeList
						transactions={incomeData}
						onDelete={(id) =>
							setOpenDeleteAlert({
								show: true,
								data: id,
							})
						}
						onDownload={handleDownloadIncomeDetails}
					/>
				</div>

				<PrimaryModal
					isOpen={isAddIncomeModalOpen}
					onClose={() => setIsOpenAddIncomeModal(false)}
					title="Add Income"
				>
					<AddIncomeForm onAddIncome={handleAddIncome} />
				</PrimaryModal>

				<PrimaryModal
					isOpen={openDeleteAlert.show}
					onClose={() =>
						setOpenDeleteAlert({
							show: false,
							data: null,
						})
					}
					title="Delete Income"
				>
					<DeleteAlert
						content="Are you sure you want to delete this income detail?"
						onDelete={() => {
							if (openDeleteAlert.data) {
								handleDeleteIncome(openDeleteAlert.data);
							}
						}}
					/>
				</PrimaryModal>
			</div>
		</DashboardLayout>
	);
};

export default Income;
