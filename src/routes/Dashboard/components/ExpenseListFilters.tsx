import type { Dayjs } from 'dayjs';
import { useSelector } from 'react-redux';
import { DateCalendar } from '../../../components/DateCalendar';
import { useDispatch } from '../../../store/hooks';
import {
	setEndDate,
	setSortBy,
	setStartDate,
	setTextFilter,
} from '../../../store/slices/filtersSlice';
import type { AppState } from '../../../store/store';
import { FilterSortBy, type FilterSortByType } from '../../../utils/DataTypes/FilterTypes';
import {
	dayjsToEpochSecondsSafeOrUndefined,
	epochToDayjsOrNull,
} from '../../../utils/Functions/Conversions/DateUtils';

const ExpenseListFilters = () => {
	const dispatch = useDispatch();
	const $filters = useSelector((state: AppState) => state.filters);
	const filtersStartDate = epochToDayjsOrNull($filters.startDate);
	const filtersEndDate = epochToDayjsOrNull($filters.endDate);

	const handleStartDateChange = (date: Dayjs | null) => {
		dispatch(setStartDate(dayjsToEpochSecondsSafeOrUndefined(date)));
	};

	const handleEndDateChange = (date: Dayjs | null) => {
		dispatch(setEndDate(dayjsToEpochSecondsSafeOrUndefined(date)));
	};

	return (
		<div className="content-container">
			<div className="input-group">
				<div className="inputGroupItem">
					<input
						className="text_input"
						id="expense-search"
						type="text"
						placeholder="Search expenses..."
						value={$filters.text}
						onChange={(e) => dispatch(setTextFilter(e.target.value))}
					/>
				</div>
				<div className="inputGroupItem">
					<select
						className="select"
						title="Sort By"
						value={$filters.sortBy}
						onChange={(e) => {
							dispatch(setSortBy(e.target.value as FilterSortByType));
						}}
					>
						<option value={FilterSortBy.DATE}>Date</option>
						<option value={FilterSortBy.AMOUNT}>Amount</option>
					</select>
				</div>
				<div className="inputGroupItem">
					<DateCalendar label="Start" value={filtersStartDate} onChange={handleStartDateChange} />

					<DateCalendar
						label="End"
						value={filtersEndDate}
						minDate={filtersStartDate ?? undefined}
						onChange={handleEndDateChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ExpenseListFilters;
