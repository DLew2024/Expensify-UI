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
		<div>
			<MainTextTypography className={styles.label}>{label}</MainTextTypography>

			<div className={styles.inputBox}>
				<input
					type={inputType}
					placeholder={placeholder}
					className={styles.input}
					value={value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				/>

				{isPassword &&
					(shouldShowPassword ? (
						<FaRegEye
							size={22}
							className={styles.FaRegEye}
							onClick={() => togglePasswordVisibility()}
						/>
					) : (
						<FaRegEyeSlash
							size={22}
							className={styles.FaRegEyeSlash}
							onClick={() => togglePasswordVisibility()}
						/>
					))}
			</div>
		</div>
	);
};

export default Input;
