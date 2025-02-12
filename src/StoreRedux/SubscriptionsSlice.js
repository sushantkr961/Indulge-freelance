import { getInitiateSubPaymentDataApi, getVerifySubPaymentDataApi } from '../Service/CouponApi/CouponApiServices';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');
const initialState = {
    status: STATUSES.IDLE,
    error: '',
    successPaymentData: {},
    initiatePaymentData: {},
};

const SubscriptionsSlice = createSlice({
    name: 'subscriptionsSlice',
    initialState: initialState,
    reducers: {
        setSubPaymentData(state, action) {
            state.successPaymentData = action.payload;
        },
        resetSubPaymentData(state) {
            state.successPaymentData = {};
        },
        setInitiateSubPaymentData(state, action) {
            state.initiatePaymentData = action.payload;
        },
        resetInitiateSubPaymentData(state) {
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
    setInitiateSubPaymentData,
    resetInitiateSubPaymentData,
    setSubPaymentData,
    resetSubPaymentData,
    setStatus,
    setError
} = SubscriptionsSlice.actions;

export default SubscriptionsSlice.reducer;

export function subPaymentInitiate(body) {
    return async function subPaymentInitiateThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getInitiateSubPaymentDataApi(body);
            console.log("paymentInitiate=====", responseData)
            dispatch(setInitiateSubPaymentData(responseData))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setError(err));
        }
    };
}
export function subPaymentVerify(body) {
    return async function subPaymentVerifyThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getVerifySubPaymentDataApi(body);
            console.log("paymentInitiate=====", responseData)
            dispatch(setInitiateSubPaymentData(responseData))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setError(err));
        }
    };
}
