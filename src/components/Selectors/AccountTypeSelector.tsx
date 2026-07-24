import { useSelector } from 'react-redux';
import type { AccountTypeDTO } from '../../api/GeneratedDTOs';
import type { AppState } from '../../store/store';
import Selector from '../common/Selector';

const AccountTypeSelector = () => {
	const $accountTypes = useSelector((state: AppState) => state.referenceData.accountTypes);

	return (
		<Selector<AccountTypeDTO>
			items={$accountTypes}
			selectedValue={''}
			label="Account Type"
			placeholder="Select Account Type"
			getValue={(accountType) => accountType.id}
			getLabel={(accountType) => accountType.name || 'Unnamed Account'}
			onChange={(accountType) => {
				if (accountType) {
					// handleChange('accountTypeId', accountType.id);
				}
			}}
		/>
	);
};

export default AccountTypeSelector;
