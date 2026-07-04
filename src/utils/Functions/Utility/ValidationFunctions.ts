import { STRICT_EMAIL_VALIDATION_REGEX } from '../../Regex/RegexUtils';

export const validateEmail = (email: string): boolean => {
	return STRICT_EMAIL_VALIDATION_REGEX.test(email.trim());
};
