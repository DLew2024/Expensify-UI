import type { AccountResponseDTO } from '../../api/GeneratedDTOs';
import type { Guid } from '../../utils/DataTypes/Guid';
import { AccountInfoCard } from '../Cards/AccountInfoCard';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';

interface AccountLists {
	accounts: AccountResponseDTO[];
	onDelete: (id: Guid) => void;
}
export const AccountList = ({ accounts, onDelete }: AccountLists) => {
	return (
		<WrapperCard>
			<div>
				<MainTextTypography variant="h5">Accounts</MainTextTypography>
			</div>

			<div>
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
