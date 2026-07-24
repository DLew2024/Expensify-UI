import type React from 'react';
import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_LabeledInput.module.scss';

type LabeledInputProps = {
	label: string;
	value?: string;
	step?: string;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	formatAsCurrency?: boolean;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onChange: (value: string) => void;
};

const LabeledInput = ({
	label,
	value = '',
	step,
	placeholder,
	type = 'text',
	formatAsCurrency = type === 'number',
	onBlur,
	onChange,
}: LabeledInputProps) => {
	const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);
	const [displayValue, setDisplayValue] = useState<string | number | readonly string[] | undefined>(
		value,
	);

	const togglePasswordVisibility = () => {
		setShouldShowPassword((prev) => !prev);
	};

	const isPassword = type === 'password';
	const inputType = isPassword ? (shouldShowPassword ? 'text' : 'password') : type;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;

		if (formatAsCurrency) {
			setDisplayValue(newValue);
		}

		onChange(newValue);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (formatAsCurrency) {
			const amount = Number(displayValue);

			if (!Number.isNaN(amount)) {
				setDisplayValue(amount.toFixed(2));
			}
		}

		onBlur?.(event);
	};

	useEffect(() => {
		if (!formatAsCurrency) {
			setDisplayValue(value);
		}
	}, [value, formatAsCurrency]);

	return (
		<div className={styles.labeledInput}>
			<MainTextTypography className={styles.labeledInput__label}>{label}</MainTextTypography>

			<div className={styles.labeledInput__inputBox}>
				<input
					type={inputType}
					placeholder={placeholder}
					className={styles.labeledInput__inputBox__element}
					value={formatAsCurrency ? displayValue : value}
					onChange={handleChange}
					onBlur={handleBlur}
					step={formatAsCurrency ? '0.01' : step}
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
