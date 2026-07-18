// import { Link } from 'react-router';
// import type { TransactionDTO } from '../../../api/GeneratedDTOs';
// import { formatEpochSecondsSafe } from '../../../utils/Functions/Conversions/DateUtils';
// import { convertPriceToString } from '../../../utils/Functions/Conversions/StringUtils';
// import { NavigationRoutePaths } from '../../../utils/Navigation/NavigationRoutePaths';

// type ExpenseListItemProps = {
// 	expense: TransactionDTO;
// };

// const ExpenseListItem = ({ expense }: ExpenseListItemProps) => {
// 	const { id, description, amount, transactionDate } = expense;
// 	return (
// 		<Link className="list_item" to={NavigationRoutePaths.EDIT_PATTERN(id)}>
// 			<div>
// 				<h3 className="list_item__title" style={{ margin: 0 }}>
// 					{description}
// 				</h3>
// 				<span className="list_item__subtitle">${formatEpochSecondsSafe(transactionDate)}</span>
// 			</div>
// 			<h3 className="list_item__data">${convertPriceToString(amount)}</h3>
// 		</Link>
// 	);
// };

// export default ExpenseListItem;
