import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';
import MainTextTypography from './MainTextTypography';
import styles from './styles/_EmojiPickerPopup.module.scss';

interface EmojiPickerPopupProps {
	icon?: string;
	onSelect: (selectedIcon: string) => void;
}

const EmojiPickerPopup = ({ icon, onSelect }: EmojiPickerPopupProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.emojiPicker}>
			<button type="button" className={styles.emojiPicker__trigger} onClick={() => setIsOpen(true)}>
				<div className={styles.emojiPicker__iconContainer}>
					{icon ? <img src={icon} alt="Icon" className={styles.emojiPicker__icon} /> : <LuImage />}
				</div>

				<MainTextTypography variant="body" className={styles.emojiPicker__label}>
					{icon ? 'Change Icon' : 'Pick Icon'}
				</MainTextTypography>
			</button>

			{isOpen && (
				<div className={styles.emojiPicker__popup}>
					<button
						type="button"
						className={styles.emojiPicker__closeButton}
						onClick={() => setIsOpen(false)}
					>
						<LuX />
					</button>

					<EmojiPicker open={isOpen} onEmojiClick={(emoji) => onSelect(emoji?.imageUrl ?? '')} />
				</div>
			)}
		</div>
	);
};

export default EmojiPickerPopup;
