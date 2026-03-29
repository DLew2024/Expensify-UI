import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Input from '../../../components/Inputs/Input';
import AuthLayout from '../../../components/layouts/AuthLayout';
import MainTextTypography from '../../../components/MainTextTypography';
import { PrimaryButton } from '../../../components/UI Components/buttons/PrimaryButton';
import { NavigationRoutePaths } from '../../../utils/Navigation/NavigationRoutePaths';
import styles from './styles/_LoginPage.module.scss';

// Add Google Auth Provider
const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
	};

	return (
		<AuthLayout>
			<div className={styles.container}>
				<MainTextTypography variant="h3" className={styles.header}>
					Welcome back!
				</MainTextTypography>
				<MainTextTypography variant="body" className={styles.text}>
					Please enter your credentials to access your account.
				</MainTextTypography>

				<form onSubmit={handleLogin} action="">
					<Input
						value={email}
						onChange={(value: string) => setEmail(value)}
						label="Email Address"
						placeholder="dlewis@example.com"
					/>

					<Input
						value={password}
						onChange={(value: string) => setPassword(value)}
						label="Password"
						placeholder="Minimum 8 characters"
						type="password"
					/>

					{error && (
						<MainTextTypography variant="body" className={styles.error}>
							{error}
						</MainTextTypography>
					)}

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

export default Login;
