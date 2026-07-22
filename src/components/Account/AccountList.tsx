import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import { AccountInfoCard } from '../Cards/AccountInfoCard';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_AccountList.module.scss';

interface AccountListProps {
	accounts: AccountResponseDTO[];
	onDelete: (id: Guid) => void;
}

const AccountList = ({ accounts, onDelete }: AccountListProps) => {
	return (
		<WrapperCard>
			<div className={styles.accountList__header}>
				<MainTextTypography variant="h5" className={styles.accountList__title}>
					Accounts
				</MainTextTypography>
			</div>

			<div className={styles.accountList__grid}>
				{accounts.map((account) => (
					<AccountInfoCard
						key={account.id}
						name={account.name}
						type={account.accountTypeName}
						onDelete={() => {
							if (account.id) {
								onDelete(account.id);
							}
						}}
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default AccountList;
