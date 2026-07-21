import type { ChangeEvent } from 'react';
import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import styles from './styles/_AccountSelector.module.scss';

interface AccountSelectorProps {
	accounts: AccountResponseDTO[] | null;
	selectedAccountId: string | null;
	onChange: (account: AccountResponseDTO | null) => void;
}

const AccountSelector = ({ accounts, selectedAccountId, onChange }: AccountSelectorProps) => {
	if (accounts === null) return null;

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const accountId = event.target.value;

		const selectedAccount = accounts.find((account) => account.id === accountId) ?? null;

		onChange(selectedAccount);
	};

	return (
		<div className={styles.accountSelector}>
			<label htmlFor="account-selector" className={styles.accountSelector__label}>
				Account
			</label>

			<select
				id="account-selector"
				className={styles.accountSelector__select}
				value={selectedAccountId ?? ''}
				onChange={handleChange}
			>
				<option value="">All Accounts</option>

				{accounts.map((account) => (
					<option key={account.id} value={account.id}>
						{account.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default AccountSelector;
