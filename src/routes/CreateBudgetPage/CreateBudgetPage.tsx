import { SmallCardType } from '../../utils/DataTypes/CardTypes';
import MediumCardInputs from './components/MediumCardInputs';
import { SmallCardInputs } from './components/SmallCardInputs';
import styles from './styles/_CreateBudgetPage.module.scss';

const CreateBudgetPage = () => {
	const metrics = [
		{
			title: 'Monthly Income',
			icon: 'wallet',
			color: 'green',
			cardType: SmallCardType.INCOME,
		},
		{
			title: 'Monthly Expenses',
			icon: 'clock',
			color: 'red',
			cardType: SmallCardType.EXPENSES,
		},
		{
			title: 'Monthly Savings',
			icon: 'piggy-bank',
			color: 'blue',
			cardType: SmallCardType.SAVINGS,
		},
		{
			title: 'Yearly Projection',
			icon: 'chart-up',
			color: 'purple',
			cardType: SmallCardType.INVESTMENTS,
		},
	];

	const mediumMetrics = [
		{
			title: 'Income and Goals',
			description: 'Set your starting balance, monthly incomes and savings goals',
		},
		{
			title: 'Monthly Expenses',
			description: 'Track your regular monthly expenses',
		},
		{
			title: 'Investment Returns',
			description: 'Set your expected annual return rate',
		},
	];

	return (
		<div className={styles.createBudgetWrapper}>
			<div className={styles.smallMetricsContainer}>
				{metrics.map((item) => (
					<SmallCardInputs
						key={item.title}
						title={item.title}
						icon={item.icon}
						color={item.color}
						cardType={item.cardType}
					/>
				))}
			</div>

			<div className={styles.mediumMetricsContainer}>
				{mediumMetrics.map((item) => (
					<MediumCardInputs key={item.title} title={item.title} description={item.description} />
				))}
			</div>
		</div>
	);
};

export default CreateBudgetPage;
