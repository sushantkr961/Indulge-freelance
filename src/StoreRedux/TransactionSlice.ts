const { createSlice } = require('@reduxjs/toolkit');
import { fetchData, fetchZohoBalanceApi } from "../Service/ApiService";
import { STATUSES } from "./objects";

const TransactionSlice = createSlice({
    name: 'transactionSlice',
    initialState: {
        trasanctionsData: [
            {
                date: '12.05.2024',
                time: '04:40 pm',
                id: '9384DG530',
                price: '+₹2,10,00',
                createdBy: 'builder'
            },
            {
                date: '12.05.2024',
                time: '04:40 pm',
                id: '9384DG531',
                price: '+₹2,10,00',
                createdBy: 'builder'
            },
            {
                date: '12.05.2024',
                time: '04:40 pm',
                id: '9384DG532',
                price: '+₹2,10,00',
                createdBy: 'builder'
            },
            {
                date: '12.05.2024',
                time: '04:40 pm',
                id: '9384DG533',
                price: '+₹2,10,00',
                createdBy: 'builder'
            },
            {
                date: '12.05.2024',
                time: '04:40 pm',
                id: '9384DG534',
                price: '+₹2,10,00',
                createdBy: 'builder'
            },
        ],
        balance: 0,
        receivables: 0,
        status: STATUSES.IDLE,
    },
    reducers: {
        setBalance(state: any, action: any) {
            state.balance = action.payload;
        },
        setReceivables(state: any, action: any) {
            state.receivables = action.payload;
        },
        setStatus(state: any, action: any) {
            state.status = action.payload;
        },
    },
});

export const { setReceivables, setBalance, setStatus } = TransactionSlice.actions;
export default TransactionSlice.reducer;

export function fetchZohoBalance(customer_id: any) {
    return async function fetchProductThunk(dispatch: any, getState: any) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await fetchZohoBalanceApi(customer_id);
            dispatch(setBalance(responseData.outstanding_receivable_amount));
            dispatch(setReceivables(responseData.unused_credits_receivable_amount_bcy));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
