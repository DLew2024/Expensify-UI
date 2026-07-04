import { useState } from 'react';
import type { SmallCardType } from '../../../utils/DataTypes/CardTypes';
import { SmallCardIcon } from './SmallCardIcon';
import styles from './styles/_SmallCardInput.module.scss';

export interface SmallCardInputProps {
	title: string;
	color: string;
	icon: string;
	cardType: SmallCardType;
}

export const SmallCardInputs = ({ title, color, icon, cardType }: SmallCardInputProps) => {
	const [cardAmount] = useState<number>();

	return (
		<div className={styles.smallCardInputWrapper}>
			<div className={styles.cardTitleContainer}>
				<h5>{title}</h5>
				<SmallCardIcon color={color} icon={icon} />
			</div>
			<br />
			<div>
				<input
					aria-label={`Amount of ${cardType} per month`}
					type="text"
					placeholder=""
					value={cardAmount}
				/>
			</div>
		</div>
	);
};
