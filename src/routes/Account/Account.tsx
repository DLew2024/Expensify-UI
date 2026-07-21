import { useState } from 'react';
import toast from 'react-hot-toast';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import DeleteAlert from '../../components/DeleteAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import PrimaryModal from '../../components/PrimaryModal';
import { useUserAuth } from '../../hooks/useUserAuth';
import { deleteAccount, getUserAccounts } from '../../store/services/AccountService';
import { dispatch } from '../../store/store';
import type { Guid } from '../../utils/DataTypes/Guid';
import type { DeleteAlertState } from '../../utils/DataTypes/ModalTypes';
import { handleApiError } from '../../utils/Functions/Utility/ApiFunctions';

const Account = () => {
	useUserAuth();

	const [accounts, setAccounts] = useState<AccountResponseDTO[]>([]);
	const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState<boolean>(false);
	const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
		show: false,
		data: null,
	});

	const handleDeleteIncome = async (incomeId: Guid) => {
		try {
			await dispatch(deleteAccount(incomeId)).unwrap();

			setOpenDeleteAlert({
				show: false,
				data: null,
			});

			toast.success('Account deleted successfully.');

			await refreshAccountDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error deleting income:');
		}
	};

	const refreshAccountDetails = async () => {
		try {
			const response = await dispatch(getUserAccounts()).unwrap();
			setAccounts(response);
		} catch (error: unknown) {
			handleApiError(error, 'Error fetching income details:');
		}
	};

	return (
		<DashboardLayout activeMenu="Accounts">
			<div>
				<div></div>

				<PrimaryModal
					isOpen={isAddAccountModalOpen}
					onClose={() => setIsAddAccountModalOpen(false)}
					title="Add Account"
				>
					<AccountOverview accounts={accounts} />
				</PrimaryModal>

				<PrimaryModal
					isOpen={openDeleteAlert.show}
					onClose={() =>
						setOpenDeleteAlert({
							show: false,
							data: null,
						})
					}
					title="Delete Account"
				>
					<DeleteAlert
						content="Are you sure you want to delete this account? All income and expenses associated to this account will be lost."
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

interface AccountOverviewProps {
	accounts: AccountResponseDTO[];
}

const AccountOverview = ({ accounts }: AccountOverviewProps) => {
	return (
		<div>
			Account
			<div>
				{accounts.map((account) => (
					<div key={account.id}>Test</div>
				))}
			</div>
		</div>
	);
};

export default Account;
