// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router';
// import ExpenseForm from '../../components/ExpenseForm';
// import { useDispatch } from '../../store/hooks';
// import { editExpense, removeExpense } from '../../store/slices/expensesSlice';
// import type { AppState } from '../../store/store';
// import { EMPTY_EXPENSE } from '../../utils/DataTypes/ExpenseTypes';
// import { NavigationRoutePaths } from '../../utils/Navigation/NavigationRoutePaths';

// const EditExpensePage = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();

// 	const { id: paramId } = useParams<{ id: string }>();
// 	const $expenses = useSelector((state: AppState) => state.expenses.expenseItems);

// 	const expense = $expenses.find((exp) => exp.id === paramId) ?? EMPTY_EXPENSE;

// 	return (
// 		<div>
// 			<div className="page-header">
// 				<div className="content-container">
// 					<h1 className="page_header__title">Edit Expense</h1>
// 				</div>
// 			</div>
// 			<div className="content-container">
// 				<ExpenseForm
// 					expense={expense}
// 					onSubmitForm={(expense) => {
// 						dispatch(editExpense(expense));
// 						navigate(NavigationRoutePaths.ROOT);
// 					}}
// 				/>
// 				<button
// 					className="button"
// 					type="button"
// 					onClick={() => {
// 						dispatch(removeExpense(expense.id));
// 						navigate(NavigationRoutePaths.ROOT);
// 					}}
// 				>
// 					Remove Expense
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default EditExpensePage;
