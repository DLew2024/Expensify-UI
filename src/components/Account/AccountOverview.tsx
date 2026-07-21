import { LuPlus } from 'react-icons/lu';
import AddButton from '../common/AddButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';

// import styles from './styles/_AccountOverview.module.scss';

interface AccountOverviewProps {
	onAddAccount: () => void;
}
export const AccountOverview = ({ onAddAccount }: AccountOverviewProps) => {
	return (
		<WrapperCard>
			<div>
				<MainTextTypography variant="h5">Account Overview</MainTextTypography>
				<MainTextTypography variant="body">
					Create accounts to add financial data too.
				</MainTextTypography>
			</div>

			<AddButton icon={<LuPlus />} onClick={onAddAccount}>
				Add Account
			</AddButton>
		</WrapperCard>
	);
};
