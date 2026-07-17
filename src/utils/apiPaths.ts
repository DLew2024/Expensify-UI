import type { Guid } from './DataTypes/Guid';


export const API_PATHS = {
	AUTH: {
		LOGIN: 'api/auth/login',
		REGISTER: 'api/auth/register',
		GET_USER_INFO: 'api/auth/getUser',
	},
	DASHBOARD: {
		GET_DATA: 'api/dashboard',
	},
	INCOME: {
		ADD_INCOME: 'api/income/add',
		GET_ALL_INCOME: 'api/income/get',
		DELETE_INCOME: (incomeId: Guid) => `api/income/${incomeId}`,
		DOWNLOAD_INCOME: 'api/income/downloadExcel',
	},
	EXPENSE: {
		ADD_EXPENSE: 'api/expense/',
		GET_ALL_EXPENSES: 'api/expense/',
		DELETE_EXPENSE: () => `api/expense/`,
		DOWNLOAD_EXPENSE: 'api/expense/downloadExcel',
	},
	IMAGE: {
		UPLOAD_IMAGE: 'api/auth/upload-image',
	},
};
