import type React from 'react';
import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import {
	CURRENCY_INPUT_REGEX,
	THOUSANDS_SEPARATOR_CHARACTER_REGEX,
} from '../../utils/Regex/RegexUtils';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_LabeledInput.module.scss';

type LabeledInputProps = {
	label: string;
	value?: string;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	formatAsCurrency?: boolean;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onChange: (value: string) => void;
};

const removeThousandsSeparators = (value: string): string =>
	value.replace(THOUSANDS_SEPARATOR_CHARACTER_REGEX, '');

const currencyFormatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const LabeledInput = ({
	label,
	value = '',
	placeholder,
	type = 'text',
	formatAsCurrency,
	onBlur,
	onChange,
}: LabeledInputProps) => {
	const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [displayValue, setDisplayValue] = useState<string>(value);

	const isPassword = type === 'password';

	const inputType = formatAsCurrency
		? 'text'
		: isPassword
			? shouldShowPassword
				? 'text'
				: 'password'
			: type;

	const togglePasswordVisibility = () => {
		setShouldShowPassword((previousValue) => !previousValue);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const enteredValue = event.target.value;

		if (!formatAsCurrency) {
			onChange(enteredValue);
			return;
		}

		const normalizedValue = removeThousandsSeparators(enteredValue);

		if (!CURRENCY_INPUT_REGEX.test(normalizedValue)) {
			return;
		}

		setDisplayValue(normalizedValue);
		onChange(normalizedValue);
	};

	const handleFocus = () => {
		if (!formatAsCurrency) {
			return;
		}

		setIsFocused(true);
		setDisplayValue((currentValue) => removeThousandsSeparators(currentValue));
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);

		if (formatAsCurrency) {
			const normalizedValue = removeThousandsSeparators(displayValue);

			const amount = Number(normalizedValue);

			if (normalizedValue !== '' && Number.isFinite(amount)) {
				setDisplayValue(currencyFormatter.format(amount));
				onChange(amount.toFixed(2));
			}
		}

		onBlur?.(event);
	};

	useEffect(() => {
		if (!formatAsCurrency) {
			setDisplayValue(value);
			return;
		}

		if (isFocused) {
			return;
		}

		const normalizedValue = removeThousandsSeparators(value);

		const amount = Number(normalizedValue);

		if (normalizedValue !== '' && Number.isFinite(amount)) {
			setDisplayValue(currencyFormatter.format(amount));
		} else {
			setDisplayValue('');
		}
	}, [value, formatAsCurrency, isFocused]);

	return (
		<div className={styles.labeledInput}>
			<MainTextTypography className={styles.labeledInput__label}>{label}</MainTextTypography>

			<div className={styles.labeledInput__inputBox}>
				<input
					className={styles.labeledInput__inputBox__element}
					type={inputType}
					inputMode={formatAsCurrency ? 'decimal' : undefined}
					placeholder={placeholder}
					value={formatAsCurrency ? displayValue : value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>

				{isPassword &&
					(shouldShowPassword ? (
						<FaRegEye
							size={22}
							className={styles.labeledInput__eyeOpenIcon}
							onClick={togglePasswordVisibility}
						/>
					) : (
						<FaRegEyeSlash
							size={22}
							className={styles.labeledInput__eyeClosedIcon}
							onClick={togglePasswordVisibility}
						/>
					))}
			</div>
		</div>
	);
};

export default LabeledInput;
