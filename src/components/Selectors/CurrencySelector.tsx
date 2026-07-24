import { useSelector } from 'react-redux';
import type { CurrencyCodeDTO } from '../../api/GeneratedDTOs';
import type { AppState } from '../../store/store';
import Selector from '../common/Selector';

const CurrencySelector = () => {
	const $currency = useSelector((state: AppState) => state.referenceData.currencies);

	return (
		<Selector<CurrencyCodeDTO>
			items={$currency}
			selectedValue={''}
			label="Selected Account"
			placeholder="Select Account"
			getValue={(currency) => currency.id}
			getLabel={(currency) => currency.name || 'Unnamed Account'}
			onChange={(currency) => {
				if (!currency) return;
				// dispatch(setSelectedAccountId(currency.id));
			}}
		/>
	);
};

export default CurrencySelector;
