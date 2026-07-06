import clsx from 'clsx';
import { getInitials } from '../../utils/Functions/Utility/ValidationFunctions';
import styles from './styles/_CharsAvatar.module.scss';

interface CharAvatarProps {
	fullName: string | undefined;
	className: string;
}

const CharAvatar = ({ fullName, className }: CharAvatarProps) => {
	return (
		<div className={clsx(styles.charAvatarContainer, className)}>{getInitials(fullName || '')}</div>
	);
};

export default CharAvatar;
