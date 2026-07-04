import MainTextTypography from '../../../components/MainTextTypography';
import { AddLabeledInputButton } from './AddLabeledInputButton';
import { CurrencyInput } from './CurrencyInput';
import { CurrencyLabeledInput } from './CurrencyLabeledInput';
import styles from './styles/_MediumCardInput.module.scss';

interface MediumCardInputsProps {
	title: string;
	description: string;
}

export const MediumCardInputs = ({ title, description }: MediumCardInputsProps) => {
	const firstList = [
		<CurrencyLabeledInput key="input-1" />,
		<CurrencyLabeledInput key="input-2" />,
		<CurrencyLabeledInput key="input-3" />,
	];

	const secondList = [
		<CurrencyLabeledInput key="input-1" />,
		<CurrencyLabeledInput key="input-2" />,
	];
	return (
		<div className={styles.mediumCardContainer}>
			<div className={styles.mediumCardTitleContainer}>
				<div>{'Icon'}</div>
				<MainTextTypography className={styles.title} variant="h3">
					{title}
				</MainTextTypography>
			</div>
			<p>{description}</p>
			<CurrencyInput />
			{/* <>Income Sources Line</>  */}
			<ListOfLabeledInputs list={firstList} />
			{/* Savings Goals */}
			<ListOfLabeledInputs list={secondList} />
		</div>
	);
};

interface ListOfLabeledInputs {
	list: React.ReactElement[];
}

const ListOfLabeledInputs = ({ list }: ListOfLabeledInputs) => {
	return (
		<div className={styles.listOfLabeledInputsWrapper}>
			<div className={styles.listOfLabeledInputsContainer}>
				{list.map((listItemComponent) => listItemComponent)}
			</div>
			<AddLabeledInputButton />
		</div>
	);
};

export default MediumCardInputs;
