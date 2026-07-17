import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USER_DASHBOARD_INFO_THUNK_ID } from '../../models/Constants/ThunkIds/Dashboard';
import { buildAxiosCall } from '../services';

//#region GET
export const getUserDashboardData = createAsyncThunk<void, void>(
	GET_USER_DASHBOARD_INFO_THUNK_ID,
	async () => {
		const { data } = await buildAxiosCall<void, void>('GET', 'api/dashboard');

		return data;
	},
);
//#endregion GET

//#region POST

//#endregion POST

//#region PUT

//#endregion PUT

//#region DELETE

//#endregion DELETE
