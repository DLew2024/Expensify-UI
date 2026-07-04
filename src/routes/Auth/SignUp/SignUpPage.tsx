import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import LabeledInput from '../../../components/Inputs/LabeledInput';
import ProfilePhotoSelector from '../../../components/Inputs/ProfilePhotoSelector';
import AuthLayout from '../../../components/layouts/AuthLayout';
import MainTextTypography from '../../../components/MainTextTypography';
import PrimaryButton from '../../../components/UI Components/buttons/PrimaryButton';
import { validateEmail } from '../../../utils/Functions/Utility/ValidationFunctions';
import { NavigationRoutePaths } from '../../../utils/Navigation/NavigationRoutePaths';
import styles from './styles/_SignUp.module.scss';

const SignUpPage = () => {

	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [fullName, setFullName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();

		const profilePictureUrl: string | null = null;

		if (!fullName) {
			setError('Full name is required');
			return;
		}

		if (!validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}

		if (!password) {
			setError('Password is required');
			return;
		}

		setError(null);

		//Signup API call here
	};

	return (
		<AuthLayout>
			<div className={styles.signup_container}>
				<h3 className={styles.signup_container__title}>Create an Account</h3>
				<p className={styles.signup_container__subtitle}>
					Join us today by entering your details below
				</p>

				<form onSubmit={handleSignUp} action="">
					<ProfilePhotoSelector image={profilePicture} setImage={setProfilePicture} />

					<div className={styles.form__inputContainer}>
						<LabeledInput
							value={fullName}
							onChange={(value: string) => setFullName(value)}
							label="Full Name"
							placeholder="John Doe"
						/>

						<LabeledInput
							value={email}
							onChange={(value: string) => setEmail(value)}
							label="Email Address"
							placeholder="dlewis@example.com"
						/>

						<div className={styles.form__inputContainer__password}>
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
					</div>

					<PrimaryButton aria-label="Sign Up Button" type="submit">
						SIGN UP
					</PrimaryButton>

					<MainTextTypography variant="body" className={styles.signUpText}>
						Already have an account?{' '}
						<Link className={styles.signUpLink} to={NavigationRoutePaths.LOGIN}>
							Log In
						</Link>
					</MainTextTypography>
				</form>
			</div>
		</AuthLayout>
	);
};

export default SignUpPage;
