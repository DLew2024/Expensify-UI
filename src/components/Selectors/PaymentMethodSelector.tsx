import { useSelector } from 'react-redux';
import type { PaymentMethodDTO } from '../../api/GeneratedDTOs';
import type { AppState } from '../../store/store';
import type { Guid } from '../../utils/DataTypes/Guid';
import Selector from '../common/Selector';

interface PaymentMethodSelectorProps {
	selectedCurrencyId: Guid | null;
	onChange: (currencyId: Guid | null) => void;
}

const PaymentMethodSelector = ({ selectedCurrencyId, onChange }: PaymentMethodSelectorProps) => {
	const $paymentMethods = useSelector((state: AppState) => state.referenceData.paymentMethods);

	return (
		<Selector<PaymentMethodDTO>
			items={$paymentMethods}
			selectedValue={selectedCurrencyId}
			label="Payment Method"
			placeholder="Select Payment Method"
			getValue={(paymentMethod) => paymentMethod.id}
			getLabel={(paymentMethod) => paymentMethod.name}
			onChange={(paymentMethod) => {
				onChange(paymentMethod?.id ?? null);
			}}
		/>
	);
};

export default PaymentMethodSelector;
