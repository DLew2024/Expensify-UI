import type React from 'react';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import MainTextTypography from '../MainTextTypography';
import styles from './styles/_Input.module.scss';

type InputProps = {
	label: string;
	value: string;
	placeholder?: string;
	type?: React.HTMLInputTypeAttribute;
	onChange: (value: string) => void;
};

const Input = ({ label, value, placeholder, type = 'text', onChange }: InputProps) => {
	const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);

	const togglePasswordVisibility = () => {
		setShouldShowPassword((prev) => !prev);
	};

	const isPassword = type === 'password';
	const inputType = isPassword ? (shouldShowPassword ? 'text' : 'password') : type;

	return (
		<div className={styles.input}>
			<MainTextTypography className={styles.input__label}>{label}</MainTextTypography>

			<div className={styles.input__wrapper}>
				<input
					type={inputType}
					placeholder={placeholder}
					className={styles.input__element}
					value={value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				/>

				{isPassword &&
					(shouldShowPassword ? (
						<FaRegEye
							size={22}
							className={styles.input__eyeOpenIcon}
							onClick={() => togglePasswordVisibility()}
						/>
					) : (
						<FaRegEyeSlash
							size={22}
							className={styles.input__eyeClosedIcon}
							onClick={() => togglePasswordVisibility()}
						/>
					))}
			</div>
		</div>
	);
};

export default Input;
