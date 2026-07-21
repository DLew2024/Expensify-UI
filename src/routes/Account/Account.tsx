import { useState } from 'react';
import toast from 'react-hot-toast';
import type { AccountResponseDTO, CreateAccountDTO } from '../../api/GeneratedDTOs';
import { AccountList } from '../../components/Account/AccountList';
import { AccountOverview } from '../../components/Account/AccountOverview';
import { AddAccountForm } from '../../components/Account/AddAccountForm';
import DeleteAlert from '../../components/DeleteAlert';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import PrimaryModal from '../../components/PrimaryModal';
import { useUserAuth } from '../../hooks/useUserAuth';
import {
	addUserAccount,
	deleteAccount,
	getUserAccounts,
} from '../../store/services/AccountService';
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

	const handleAddAccount = async (account: CreateAccountDTO) => {
		// const { name, accountTypeId, institutionName, lastFourDigits, currencyCode, includeInNetWorth, initialBalance } = account;

		// if (!name.trim()) {
		// 	toast.error('Account name is required.');
		// 	return;
		// }

		// if (!initialBalance || Number.isNaN(initialBalance) || initialBalance <= 0) {
		// 	toast.error('Amount should be a valid number greater than 0.');
		// 	return;
		// }

		// Handle errors

		try {
			await dispatch(addUserAccount(account)).unwrap();

			setIsAddAccountModalOpen(false);
			toast.success('Account added successfully.');

			await refreshAccountDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error adding Account:');
		}
	};

	const handleDeleteAccount = async (accountId: Guid) => {
		try {
			await dispatch(deleteAccount(accountId)).unwrap();

			setOpenDeleteAlert({
				show: false,
				data: null,
			});

			toast.success('Account deleted successfully.');

			await refreshAccountDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error deleting account:');
		}
	};

	const refreshAccountDetails = async () => {
		try {
			const response = await dispatch(getUserAccounts()).unwrap();
			setAccounts(response);
		} catch (error: unknown) {
			handleApiError(error, 'Error fetching account details:');
		}
	};

	return (
		<DashboardLayout activeMenu="Accounts">
			<div>
				<div>
					<AccountOverview onAddAccount={() => setIsAddAccountModalOpen(true)} />

					<AccountList
						accounts={accounts}
						onDelete={(id) =>
							setOpenDeleteAlert({
								show: true,
								data: id,
							})
						}
					/>
				</div>

				<PrimaryModal
					isOpen={isAddAccountModalOpen}
					onClose={() => setIsAddAccountModalOpen(false)}
					title="Add Account"
				>
					<AddAccountForm onAddAccount={handleAddAccount} />
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
						content="Are you sure you want to delete this account? All account information associated to this account will be lost."
						onDelete={() => {
							if (openDeleteAlert.data) {
								handleDeleteAccount(openDeleteAlert.data);
							}
						}}
					/>
				</PrimaryModal>
			</div>
		</DashboardLayout>
	);
};

export default Account;
