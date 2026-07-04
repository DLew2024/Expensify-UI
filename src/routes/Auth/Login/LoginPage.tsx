import { useState } from 'react';
import { Link } from 'react-router';
import LabeledInput from '../../../components/Inputs/LabeledInput';
import AuthLayout from '../../../components/layouts/AuthLayout';
import MainTextTypography from '../../../components/MainTextTypography';
import { PrimaryButton } from '../../../components/UI Components/buttons/PrimaryButton';
import { validateEmail } from '../../../utils/Functions/Utility/ValidationFunctions';
import { NavigationRoutePaths } from '../../../utils/Navigation/NavigationRoutePaths';
import styles from './styles/_LoginPage.module.scss';

// Add Google Auth Provider
const LoginPage = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			setError('Please enter your email');
			return;
		}

		if (!password) {
			setError('Please enter your password');
			return;
		}

		setError(null);

		// Login API call logic here
	};

	return (
		<AuthLayout>
			<div className={styles.login_container}>
				<MainTextTypography variant="h3" className={styles.login_container__header}>
					Welcome back!
				</MainTextTypography>

				<MainTextTypography variant="body" className={styles.login_container__subtitle}>
					Please enter your credentials to access your account.
				</MainTextTypography>

				<form onSubmit={handleLogin} action="" className={styles.form}>
					<div className={styles.form__inputContainer}>
						<LabeledInput
							value={email}
							onChange={(value: string) => setEmail(value)}
							label="Email Address"
							placeholder="dlewis@example.com"
						/>

						<LabeledInput
							value={password}
							onChange={(value: string) => setPassword(value)}
							label="Password"
							placeholder="Minimum 8 characters"
							type="password"
						/>

						{error && (
							<MainTextTypography variant="body" className={styles.errorText}>
								{error}
							</MainTextTypography>
						)}
					</div>

					<PrimaryButton aria-label="Login Button" type="submit">
						LOGIN
					</PrimaryButton>

					<MainTextTypography variant="body" className={styles.signUpText}>
						Don't have an account?{' '}
						<Link className={styles.signUpLink} to={NavigationRoutePaths.SIGN_UP}>
							Sign up
						</Link>
					</MainTextTypography>
				</form>
			</div>
		</AuthLayout>
	);
};

export default LoginPage;
