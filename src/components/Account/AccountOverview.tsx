import { LuPlus } from 'react-icons/lu';
import AddButton from '../common/AddButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_AccountOverview.module.scss';

interface AccountOverviewProps {
	onAddAccount: () => void;
}
export const AccountOverview = ({ onAddAccount }: AccountOverviewProps) => {
	return (
		<WrapperCard>
			<div className={styles.accountOverview__header}>
				<div>
					<MainTextTypography variant="h5" className={styles.accountOverview__title}>
						Account Overview
					</MainTextTypography>

					<MainTextTypography variant="body" className={styles.accountOverview__description}>
						Create accounts to add financial data to.
					</MainTextTypography>
				</div>

				<AddButton icon={<LuPlus />} onClick={onAddAccount}>
					Add Account
				</AddButton>
			</div>
		</WrapperCard>
	);
};
