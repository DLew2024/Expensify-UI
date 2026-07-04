import { useNavigate } from 'react-router';
import ExpenseForm from '../../components/ExpenseForm';
import { useDispatch } from '../../store/hooks';
import { addExpense } from '../../store/slices/expensesSlice';
import { NavigationRoutePaths } from '../../utils/Navigation/NavigationRoutePaths';

const AddExpensePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div>
			<div className="page_header">
				<div className="content_container">
					<h1 className="page_header__title">Add Expense</h1>
				</div>
			</div>
			<div className="content_container">
				<ExpenseForm
					onSubmitForm={(expense) => {
						dispatch(addExpense(expense));
						navigate(NavigationRoutePaths.ROOT);
					}}
				/>
			</div>
		</div>
	);
};

export default AddExpensePage;
