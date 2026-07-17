//#region GET

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UPLOAD_IMAGE_THUNK_ID } from '../../models/Constants/ThunkIds/Image';
import { buildAxiosCall } from '../services';
import type { UploadImageResponse } from './AuthService';

//#endregion GET

//#region POST
export const uploadImage = createAsyncThunk<UploadImageResponse, File>(
	UPLOAD_IMAGE_THUNK_ID,
	async (imageFile) => {
		const formData = new FormData();
		formData.append('image', imageFile);

		try {
			const { data } = await buildAxiosCall<UploadImageResponse, FormData>(
				'POST',
				'api/image/upload-image',
				formData,
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
	},
);
//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE

//#endregion DELETE
