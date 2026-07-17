import type React from 'react';
import { useRef, useState } from 'react';
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';
import styles from './styles/_ProfilePhotoSelector.module.scss';

interface ProfilePhotoSelectorProps {
	image?: File;
	setImage: (file?: File) => void;
}

const ProfilePhotoSelector = ({ image, setImage }: ProfilePhotoSelectorProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			setImage(file);

			const preview = URL.createObjectURL(file);
			setPreviewUrl(preview);
		}
	};

	const handleRemoveImage = () => {
		setImage(undefined);
		setPreviewUrl(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const onChooseFile = () => {
		inputRef.current?.click();
	};

	return (
		<div className={styles.profilePhotoSelector}>
			<input
				accept="image/*"
				className={styles.profilePhotoSelector__input}
				onChange={handleImageChange}
				placeholder="Choose a profile photo"
				ref={inputRef}
				type="file"
			/>

			{!image ? (
				<div className={styles.profilePhotoSelector__placeholder}>
					<LuUser className={styles.profilePhotoSelector__icon} />

					<button
						className={styles.profilePhotoSelector__chooseButton}
						onClick={onChooseFile}
						title="Choose a profile photo"
						type="button"
					>
						<LuUpload />
					</button>
				</div>
			) : (
				<div className={styles.profilePhotoSelector__previewContainer}>
					<img
						className={styles.profilePhotoSelector__previewImage}
						alt="Profile Preview"
						src={previewUrl || ''}
					/>

					<button
						className={styles.profilePhotoSelector__removeButton}
						onClick={handleRemoveImage}
						type="button"
						title="Remove profile photo"
					>
						<LuTrash />
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfilePhotoSelector;
