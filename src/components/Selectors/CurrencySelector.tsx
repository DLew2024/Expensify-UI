import { useSelector } from 'react-redux';
import type { CurrencyCodeDTO } from '../../api/GeneratedDTOs';
import type { AppState } from '../../store/store';
import type { Guid } from '../../utils/DataTypes/Guid';
import Selector from '../common/Selector';

interface CurrencySelectorProps {
	selectedCurrencyId: Guid | null;
	onChange: (currencyId: Guid | null) => void;
}

const CurrencySelector = ({ selectedCurrencyId, onChange }: CurrencySelectorProps) => {
	const $currency = useSelector((state: AppState) => state.referenceData.currencies);

	return (
		<Selector<CurrencyCodeDTO>
			items={$currency}
			selectedValue={selectedCurrencyId}
			label='Account Currency'
			placeholder='Select Currency Type'
			getValue={(currency) => currency.id}
			getLabel={(currency) => `${currency.code} - ${currency.name}`}
			onChange={(currency) => {
				onChange(currency?.id ?? null);
			}}
		/>
	);
};

export default CurrencySelector;
