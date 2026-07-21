import { ThunkOperation } from '../Redux/ThunkOperations';

//** GET */
//#region GET
export const GET_ALL_EXPENSE_THUNK_ID = `${ThunkOperation.GET}-All Expense`;
export const GET_DOWNLOADED_EXPENSE_THUNK_ID = `${ThunkOperation.GET}-Downloaded Expense`;
//#endregion GET

//** CREATE */
//#region CREATE
export const CREATE_EXPENSE_THUNK_ID = `${ThunkOperation.CREATE}-Expense`;
//#endregion CREATE

//** UPDATE */
//#region UPDATE
//#endregion UPDATE

//** PUT */
//#region PUT
//#endregion PUT

//** UPSERT */
//#region UPSERT

//#endregion UPSERT

//** DELETE */
//#region DELETE
export const DELETE_EXPENSE_THUNK_ID = `${ThunkOperation.DELETE}-Expense`;
//#endregion DELETE
