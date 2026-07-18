import moment from 'moment';
import { LuDownload } from 'react-icons/lu';
import type { IncomeTransactionDTO } from '../../utils/Functions/Conversions/NumberUtils';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import CardButton from '../common/CardButton';
import WrapperCard from '../common/WrapperCard';
import MainTextTypography from '../MainTextTypography';

interface IncomeListProps {
	transactions: IncomeTransactionDTO[];
	onDelete: (id: string) => void;
	onDownload: () => void;
}
const IncomeList = ({ transactions, onDelete, onDownload }: IncomeListProps) => {
	return (
		<WrapperCard>
			<div className="flex item-center justify-between">
				<MainTextTypography className="text-lg" variant="h5">
					Income Sources
				</MainTextTypography>

				<CardButton onClick={onDownload}>
					<LuDownload className="text-base" />
				</CardButton>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2">
				{transactions?.map((income) => (
					<TransactionInfoCard
						key={income.id}
						title={income.source}
						icon={income.icon}
						date={moment(income.date).format('Do MMM YYYY')}
						amount={income.amount}
						type="income"
						onDelete={() => onDelete(income.id)}
					/>
				))}
			</div>
		</WrapperCard>
	);
};

export default IncomeList;
