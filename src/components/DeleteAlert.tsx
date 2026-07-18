import FillButton from './common/FillButton';
import MainTextTypography from './MainTextTypography';

interface DeleteAlertProps {
	content: string;
	onDelete: () => void;
}

const DeleteAlert = ({ content, onDelete }: DeleteAlertProps) => {
	return (
		<div>
			<MainTextTypography variant="body" className="text-sm">
				{content}
			</MainTextTypography>

			<div className="flex justify-end mt-6">
				<FillButton onClick={onDelete}>Delete</FillButton>
			</div>
		</div>
	);
};

export default DeleteAlert;
