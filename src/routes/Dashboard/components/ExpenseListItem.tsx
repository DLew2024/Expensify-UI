import { Link } from 'react-router';
import type { Expense } from '../../../utils/DataTypes/ExpenseTypes';
import { formatEpochSecondsSafe } from '../../../utils/Functions/Conversions/DateUtils';
import { convertPriceToString } from '../../../utils/Functions/Conversions/StringUtils';
import { NavigationRoutePaths } from '../../../utils/Navigation/NavigationRoutePaths';

const ExpenseListItem = ({ id, description, amount, createdAt }: Expense) => {
	return (
		<Link className="list_item" to={NavigationRoutePaths.EDIT_PATTERN(id)}>
			<div>
				<h3 className="list_item__title" style={{ margin: 0 }}>
					{description}
				</h3>
				<span className="list_item__subtitle">${formatEpochSecondsSafe(createdAt)}</span>
			</div>
			<h3 className="list_item__data">${convertPriceToString(amount)}</h3>
		</Link>
	);
};

export default ExpenseListItem;
