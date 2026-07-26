import { type KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import { LuCheck, LuChevronDown } from 'react-icons/lu';
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
	placeholder = 'Select',
	getValue,
	getLabel,
	onChange,
}: SelectorProps<T>) => {
	const selectorId = useId();
	const selectorRef = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [focusedIndex, setFocusedIndex] = useState<number>(-1);

	const selectedItem = useMemo(
		() => items?.find((item) => getValue(item) === selectedValue) ?? null,
		[items, selectedValue, getValue],
	);

	const displayLabel = selectedItem ? getLabel(selectedItem) : placeholder;

	const closeDropdown = () => {
		setIsOpen(false);
		setFocusedIndex(-1);
	};

	const toggleDropdown = () => {
		setIsOpen((previousValue) => !previousValue);
	};

	const handleSelect = (item: T | null) => {
		onChange(item);
		closeDropdown();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (!items) {
			return;
		}

		switch (event.key) {
			case 'ArrowDown': {
				event.preventDefault();

				if (!isOpen) {
					setIsOpen(true);
					setFocusedIndex(0);
					return;
				}

				setFocusedIndex((previousIndex) => Math.min(previousIndex + 1, items.length));
				break;
			}

			case 'ArrowUp': {
				event.preventDefault();

				if (!isOpen) {
					setIsOpen(true);
					setFocusedIndex(items.length);
					return;
				}

				setFocusedIndex((previousIndex) => Math.max(previousIndex - 1, 0));
				break;
			}

			case 'Enter':
			case ' ': {
				event.preventDefault();

				if (!isOpen) {
					setIsOpen(true);
					return;
				}

				if (focusedIndex === 0) {
					handleSelect(null);
					return;
				}

				const item = items[focusedIndex - 1];

				if (item) {
					handleSelect(item);
				}

				break;
			}

			case 'Escape': {
				event.preventDefault();
				closeDropdown();
				break;
			}
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Initial render only>
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
				closeDropdown();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	if (items === null) {
		return null;
	}

	return (
		<div ref={selectorRef} className={styles.selector}>
			<text id={`${selectorId}-label`} className={styles.selector__label}>
				{label}
			</text>

			<button
				type='button'
				className={styles.selector__trigger}
				aria-labelledby={`${selectorId}-label`}
				aria-controls={`${selectorId}-options`}
				aria-expanded={isOpen}
				aria-haspopup='listbox'
				onClick={toggleDropdown}
				onKeyDown={handleKeyDown}
			>
				<span className={selectedItem ? styles.selector__value : styles.selector__placeholder}>
					{displayLabel}
				</span>

				<LuChevronDown
					className={`${styles.selector__arrow} ${isOpen ? styles['selector__arrow--open'] : ''}`}
				/>
			</button>

			{isOpen && (
				<div
					id={`${selectorId}-options`}
					className={styles.selector__dropdown}
					role='listbox'
					aria-labelledby={`${selectorId}-label`}
				>
					<button
						type='button'
						role='option'
						aria-selected={selectedItem === null}
						className={`${styles.selector__option} ${
							focusedIndex === 0 ? styles['selector__option--focused'] : ''
						}`}
						onMouseEnter={() => setFocusedIndex(0)}
						onClick={() => handleSelect(null)}
					>
						<span>{placeholder}</span>

						{selectedItem === null && <LuCheck className={styles.selector__checkIcon} />}
					</button>

					{items.map((item, index) => {
						const value = getValue(item);
						const isSelected = value === selectedValue;
						const optionIndex = index + 1;

						return (
							<button
								key={value}
								type='button'
								role='option'
								aria-selected={isSelected}
								className={`${styles.selector__option} ${
									focusedIndex === optionIndex ? styles['selector__option--focused'] : ''
								}`}
								onMouseEnter={() => setFocusedIndex(optionIndex)}
								onClick={() => handleSelect(item)}
							>
								<span>{getLabel(item)}</span>

								{isSelected && <LuCheck className={styles.selector__checkIcon} />}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Selector;
