import { useSelector } from 'react-redux';
import type { AccountTypeDTO } from '../../api/GeneratedDTOs';
import type { AppState } from '../../store/store';
import type { Guid } from '../../utils/DataTypes/Guid';
import Selector from '../common/Selector';

interface AccountTypeSelectorProps {
	selectedAccountTypeId: Guid | null;
	onChange: (accountTypeIdyId: Guid | null) => void;
}
const AccountTypeSelector = ({ selectedAccountTypeId, onChange }: AccountTypeSelectorProps) => {
	const $accountTypes = useSelector((state: AppState) => state.referenceData.accountTypes);

	return (
		<Selector<AccountTypeDTO>
			items={$accountTypes}
			selectedValue={selectedAccountTypeId}
			label="Account Type"
			placeholder="Select Account Type"
			getValue={(accountType) => accountType.id}
			getLabel={(accountType) => accountType.name || 'Unnamed Account'}
			onChange={(accountType) => {
				onChange(accountType?.id ?? null);
			}}
		/>
	);
};

export default AccountTypeSelector;
