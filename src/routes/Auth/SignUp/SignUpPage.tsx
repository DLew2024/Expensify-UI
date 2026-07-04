import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import LabeledInput from '../../../components/Inputs/Input';
import AuthLayout from '../../../components/layouts/AuthLayout';
import { validateEmail } from '../../../utils/Functions/Utility/ValidationFunctions';
import { NavigationRoutePaths } from '../../../utils/Navigation/NavigationRoutePaths';
import styles from './styles/_SignUp.module.scss';

const SignUpPage = () => {
	const navigate = useNavigate();

	const [profilePicture, setProfilePicture] = useState<File | null>(null);
	const [fullName, setFullName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<AuthLayout>
			<div className={styles.signup_container}>
				<h3 className={styles.signup_container__title}>Create an Account</h3>
				<p className={styles.signup_container__subtitle}>
					Join us today by entering your details below{' '}
				</p>

				<form onSubmit={handleSignUp} action="">
					<div className={styles.form__inputContainer}>
						<LabeledInput
							value={fullName}
							onChange={(value: string) => setFullName(value)}
							label="Full Name"
							placeholder="John Doe"
						/>
					</div>
				</form>
			</div>
		</AuthLayout>
	);
};

export default SignUpPage;
