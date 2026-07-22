import type { ChangeEvent } from 'react';
import styles from './styles/_Selector.module.scss';

interface SelectorProps<T> {
	items: T[] | null;
	selectedValue: string | null;
	label: string;
	placeholder?: string;
	getValue: (item: T) => string;
	getLabel: (item: T) => string;
	onChange: (item: T | null) => void;
}

const Selector = <T,>({
	items,
	selectedValue,
	label,
	placeholder = 'All',
	getValue,
	getLabel,
	onChange,
}: SelectorProps<T>) => {
	if (items === null) return null;

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;

		const selectedItem = items.find((item) => getValue(item) === value) ?? null;

		onChange(selectedItem);
	};

	return (
		<div className={styles.selector}>
			<label htmlFor="selector" className={styles.selector__label}>
				{label}
			</label>

			<select
				id="selector"
				className={styles.selector__select}
				value={selectedValue ?? ''}
				onChange={handleChange}
			>
				<option value="">{placeholder}</option>

				{items.map((item) => {
					const value = getValue(item);

					return (
						<option key={value} value={value}>
							{getLabel(item)}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Selector;
