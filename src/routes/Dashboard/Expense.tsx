import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import type { AddExpenseTransactionDTO, TransactionDTO } from '../../api/GeneratedDTOs';
import AccountSelector from '../../components/Account/AccountSelector';
import DeleteAlert from '../../components/DeleteAlert';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import PrimaryModal from '../../components/PrimaryModal';
import { useUserAuth } from '../../hooks/useUserAuth';
import {
	addExpense,
	deleteExpense,
	downloadExpense,
	getAllExpense,
} from '../../store/services/ExpenseService';
import { dispatch } from '../../store/store';
import type { Guid } from '../../utils/DataTypes/Guid';
import type { DeleteAlertState } from '../../utils/DataTypes/ModalTypes';
import { validateExpense } from '../../utils/Functions/Transaction/TransactionValidation';
import { handleApiError } from '../../utils/Functions/Utility/ApiFunctions';
import styles from './styles/_Expense.module.scss';

const Expense = () => {
	useUserAuth();

	const [expenseData, setExpenseData] = useState<TransactionDTO[]>([]);
	const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState<boolean>(false);
	const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
		show: false,
		data: null,
	});

	const handleAddExpense = async (expense: AddExpenseTransactionDTO) => {
		const validationError = validateExpense(expense);

		if (validationError) {
			toast.error(validationError);
			return;
		}

		try {
			await dispatch(addExpense(expense)).unwrap();

			setIsAddExpenseModalOpen(false);

			await refreshExpenseDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error adding expense:');
		}
	};

	const handleDeleteExpense = async (expenseId: Guid) => {
		try {
			await dispatch(deleteExpense(expenseId)).unwrap();

			setOpenDeleteAlert({
				show: false,
				data: null,
			});

			await refreshExpenseDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error deleting expense:');
		}
	};

	const handleDownloadExpenseDetails = async () => {
		try {
			const blob = await dispatch(downloadExpense()).unwrap();

			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');

			link.href = url;
			link.setAttribute('download', 'expense_details.xlsx');

			document.body.appendChild(link);
			link.click();
			link.remove();

			window.URL.revokeObjectURL(url);
		} catch (error: unknown) {
			handleApiError(error, 'Error downloading expense details:');
			toast.error('Failed to download expense details. Please try again later.');
		}
	};

	const refreshExpenseDetails = async () => {
		try {
			const response = await dispatch(getAllExpense()).unwrap();
			setExpenseData(response);
		} catch (error: unknown) {
			handleApiError(error, 'Error fetching income details:');
		}
	};

	useEffect(() => {
		const fetchInitialExpenses = async () => {
			try {
				const response = await dispatch(getAllExpense()).unwrap();
				setExpenseData(response);
			} catch (error: unknown) {
				handleApiError(error, 'Error fetching income details:');
			}
		};

		fetchInitialExpenses();
	}, []);

	return (
		<DashboardLayout activeMenu="Expense">
			<div className={styles.expenseDashboard}>
				<AccountSelector />

				<div className={styles.expenseDashboard__content}>
					<div className={styles.expenseDashboard__overview}>
						<ExpenseOverview
							transactions={expenseData}
							onExpenseIncome={() => setIsAddExpenseModalOpen(true)}
						/>
					</div>

					<ExpenseList
						transactions={expenseData}
						onDelete={(id) =>
							setOpenDeleteAlert({
								show: true,
								data: id,
							})
						}
						onDownload={handleDownloadExpenseDetails}
					/>
				</div>

				<PrimaryModal
					isOpen={isAddExpenseModalOpen}
					onClose={() => setIsAddExpenseModalOpen(false)}
					title="Add Expense"
				>
					<AddExpenseForm onAddExpense={handleAddExpense} />
				</PrimaryModal>

				<PrimaryModal
					isOpen={openDeleteAlert.show}
					onClose={() =>
						setOpenDeleteAlert({
							show: false,
							data: null,
						})
					}
					title="Delete Expense"
				>
					<DeleteAlert
						content="Are you sure you want to delete this expense detail?"
						onDelete={() => {
							if (openDeleteAlert.data) {
								handleDeleteExpense(openDeleteAlert.data);
							}
						}}
					/>
				</PrimaryModal>
			</div>
		</DashboardLayout>
	);
};

export default Expense;
