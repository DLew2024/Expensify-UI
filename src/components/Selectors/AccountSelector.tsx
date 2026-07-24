import { useSelector } from 'react-redux';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import { setSelectedAccountId } from '../../store/slices/accountsSlice';
import { type AppState, dispatch } from '../../store/store';
import Selector from '../common/Selector';

// import styles from './styles/_AccountSelector.module.scss';

const AccountSelector = () => {
	const $userAccounts = useSelector((state: AppState) => state.accounts.userAccounts);
	const $selectedAccountId = useSelector((state: AppState) => state.accounts.selectedAccountId);

	return (
		<Selector<AccountResponseDTO>
			items={$userAccounts}
			selectedValue={$selectedAccountId}
			label="Selected Account"
			placeholder="Select Account"
			getValue={(account) => account.id}
			getLabel={(account) => account.name || 'Unnamed Account'}
			onChange={(account) => {
				if (!account) return;
				dispatch(setSelectedAccountId(account.id));
			}}
		/>
	);
};

export default AccountSelector;
