import { getInitiatePaymentDataApi, getVerifyPaymentDataApi } from '../Service/TopUpBalanceApi/TopUpBalanceApiServices';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');
const initialState = {
    status: STATUSES.IDLE,
    error: '',
    successPaymentData: {},
    initiatePaymentData: {},
};

const TopUpBalanceSlice = createSlice({
    name: 'topUpBalanceSlice',
    initialState: initialState,
    reducers: {
        setPaymentData(state, action) {
            state.successPaymentData = action.payload;
        },
        resetPaymentData(state) {
            state.successPaymentData = {};
        },
        setInitiatePaymentData(state, action) {
            state.initiatePaymentData = action.payload;
        },
        resetInitiatePaymentData(state) {
            state.initiatePaymentData = {};
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const {
    setInitiatePaymentData,
    resetInitiatePaymentData,
    setPaymentData,
    resetPaymentData,
    setStatus,
    setError
} = TopUpBalanceSlice.actions;

export default TopUpBalanceSlice.reducer;

export function paymentInitiate(body) {
    return async function paymentInitiateThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getInitiatePaymentDataApi(body);
            console.log("paymentInitiate=====", responseData)
            dispatch(setInitiatePaymentData(responseData))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setError(err));
        }
    };
}
export function paymentVerify(body) {
    return async function paymentVerifyThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getVerifyPaymentDataApi(body);
            console.log("paymentInitiate=====", responseData)
            dispatch(setInitiatePaymentData(responseData))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setError(err));
        }
    };
}
