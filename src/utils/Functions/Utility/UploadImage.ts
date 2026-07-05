import axios from 'axios';
import { API_PATHS } from '../../apiPaths';
import axiosInstance from '../../axiosInstance';

export interface UploadImageResponse {
	imageUrl?: string;
}

export const uploadImage = async (imageFile: File): Promise<UploadImageResponse> => {
	const formData = new FormData();
	formData.append('image', imageFile);

	try {
		const { data } = await axiosInstance.post<UploadImageResponse>(
			API_PATHS.IMAGE.UPLOAD_IMAGE,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		return data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error('Error uploading image:', error.response?.data);
		} else {
			console.error('Unexpected error:', error);
		}

		throw error;
	}
};
