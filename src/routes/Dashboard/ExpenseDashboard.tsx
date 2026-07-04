import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../store/hooks';
import { seedExpenses } from '../../store/slices/expensesSlice';
import type { AppState } from '../../store/store';
import type { EpochSeconds } from '../../utils/DataTypes/DateTypes';
import { createNewGuid } from '../../utils/DataTypes/Guid';
import { epochMillisToSeconds } from '../../utils/Functions/Conversions/DateUtils';
import { getVisibleExpenses } from '../../utils/Functions/Utility/ExpenseFunctions';
import ExpenseList from './components/ExpenseList';
import ExpenseListFilters from './components/ExpenseListFilters';

const ExpenseDashBoardPage = () => {
	const dispatch = useDispatch();

	const randomEpochSeconds = useCallback((): EpochSeconds => {
		const start = new Date(2020, 0, 1).getTime();
		const end = Date.now();
		const randomTime = start + Math.random() * (end - start);
		return epochMillisToSeconds(randomTime);
	}, []);

	const $expenses = useSelector((state: AppState) => state.expenses.expenseItems);
	const $filters = useSelector((state: AppState) => state.filters);
	const selectExpenses = getVisibleExpenses($expenses, $filters);

	const seedExpensesData = [
		{
			description: 'Water bill',
			note: 'Printer paper and ink',
			amount: 1299.37,
		},
		{
			description: 'Gas bill',
			note: 'Quarterly business review',
			amount: 7825.56,
		},
		{
			description: 'Cloud hosting',
			note: 'Monthly AWS bill',
			amount: 12999.34,
		},
		{
			description: 'Transportation',
			note: 'Ride-share to client meeting',
			amount: 2340.67,
		},
		{
			description: 'Team coffee',
			note: 'Sprint planning caffeine',
			amount: 1875.43,
		},
	] as const;

	useEffect(() => {
		dispatch(
			seedExpenses(
				seedExpensesData.map((expense) => ({
					id: createNewGuid(),
					createdAt: randomEpochSeconds(),
					...expense,
				})),
			),
		);
	}, [seedExpensesData, dispatch, randomEpochSeconds]);

	return (
		<div>
			This is from my dashboard page
			<ExpenseListFilters />
			<ExpenseList expenses={selectExpenses} />
		</div>
	);
};

export default ExpenseDashBoardPage;
