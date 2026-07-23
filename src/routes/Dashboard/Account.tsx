import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import type { AccountResponseDTO, CreateAccountDTO } from '../../api/GeneratedDTOs';
import AccountList from '../../components/Account/AccountList';
import { AccountOverview } from '../../components/Account/AccountOverview';
import AddAccountForm from '../../components/Account/AddAccountForm';
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
import { LAST_FOUR_DIGITS_REGEX } from '../../utils/Regex/RegexUtils';
import styles from './styles/_Account.module.scss';

const Account = () => {
	useUserAuth();

	const [accounts, setAccounts] = useState<AccountResponseDTO[]>([]);
	const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState<boolean>(false);
	const [openDeleteAlert, setOpenDeleteAlert] = useState<DeleteAlertState>({
		show: false,
		data: null,
	});

	const handleAddAccount = async (account: CreateAccountDTO) => {
		const validationError = validateAccount(account);

		if (validationError) {
			toast.error(validationError);
			return;
		}

		try {
			await dispatch(addUserAccount(account)).unwrap();

			setIsAddAccountModalOpen(false);

			await refreshAccountDetails();
		} catch (error: unknown) {
			handleApiError(error, 'Error adding Account:');
		}
	};

	const validateAccount = (account: CreateAccountDTO): string | null => {
		const { name, institutionName, lastFourDigits, initialBalance } = account;

		if (!name.trim()) {
			return 'Account name is required.';
		}

		if (!institutionName?.trim()) {
			return 'Institution name is required.';
		}

		if (!lastFourDigits?.trim()) {
			return 'Last four digits are required.';
		}

		if (!LAST_FOUR_DIGITS_REGEX.test(lastFourDigits.trim())) {
			return 'Last four digits must contain exactly 4 numbers.';
		}

		if (
			initialBalance === null ||
			initialBalance === undefined ||
			Number.isNaN(initialBalance) ||
			initialBalance < 0
		) {
			return 'Initial balance must be a valid number.';
		}

		return null;
	};

	const handleDeleteAccount = async (accountId: Guid) => {
		try {
			await dispatch(deleteAccount(accountId)).unwrap();

			setOpenDeleteAlert({
				show: false,
				data: null,
			});

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

	useEffect(() => {
		const fetchAccountDetails = async () => {
			try {
				const response = await dispatch(getUserAccounts()).unwrap();
				setAccounts(response);
			} catch (error: unknown) {
				handleApiError(error, 'Error fetching account details:');
			}
		};

		fetchAccountDetails();
	}, []);

	return (
		<DashboardLayout activeMenu="Accounts">
			<div className={styles.accountPage}>
				<div className={styles.accountPage__content}>
					<AccountOverview onAddAccount={() => setIsAddAccountModalOpen(true)} />

					<AccountList
						accounts={accounts}
						onDelete={(id: Guid) =>
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
