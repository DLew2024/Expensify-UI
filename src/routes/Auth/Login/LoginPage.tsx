import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import LabeledInput from '../../../components/Inputs/LabeledInput';
import AuthLayout from '../../../components/layouts/AuthLayout';
import MainTextTypography from '../../../components/MainTextTypography';
import { PrimaryButton } from '../../../components/UI Components/buttons/PrimaryButton';
import { useUserContext } from '../../../context/userContext';
import { loginUser } from '../../../store/services/AuthService';
import { dispatch } from '../../../store/store';
import { handleApiError } from '../../../utils/Functions/Utility/ApiFunctions';
import { validateEmail } from '../../../utils/Functions/Utility/ValidationFunctions';
import { NavigationRoutePaths } from '../../../utils/Navigation/NavigationRoutePaths';
import styles from './styles/_LoginPage.module.scss';

// Add Google Auth Provider
const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const { updateUser } = useUserContext();

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

		try {
			const { token, user } = await dispatch(loginUser({ email, password })).unwrap();

			localStorage.setItem('token', token);
			updateUser(user);
			navigate(NavigationRoutePaths.DASHBOARD);
		} catch (error: unknown) {
			handleApiError(error, 'Error logging in account:');
		}
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

				<form onSubmit={handleLogin} className={styles.form}>
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
