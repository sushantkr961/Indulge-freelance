import { changeQuantityDataApi, getCartListApi } from '../Service/CartApi/CartApiServices';
import { getOrderListApi } from '../Service/OrderApi/OrderApiServices';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');

const OrderListSlice = createSlice({
    name: 'orderList',
    initialState: {
        orderList: [],
        completeOrderList: [],
        status: STATUSES.IDLE,
        error: ''
    },
    reducers: {
        setOrderListData(state, action) {
            state.orderList = action.payload;
        },
        setCompleteOrderListData(state, action) {
            state.completeOrderList = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setOrderListData, setCompleteOrderListData, setStatus, setError } = OrderListSlice.actions;
export default OrderListSlice.reducer;

export function fetchOrderListData(userId, status) {
    return async function fetchOrderListDataThunk(dispatch, getState) {
        dispatch(setOrderListData([]));
        dispatch(setStatus(STATUSES.LOADING));
        dispatch(setError(''));
        try {
            const responseData = await getOrderListApi(userId, status);
            dispatch(setOrderListData(responseData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setError(err));
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchCompleteOrderListData(userId, status) {
    return async function fetchCompleteOrderListDataThunk(dispatch, getState) {
        dispatch(setCompleteOrderListData([]));
        dispatch(setStatus(STATUSES.LOADING));
        dispatch(setError(''));
        try {
            const responseData = await getOrderListApi(userId, status);
            dispatch(setCompleteOrderListData(responseData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setError(err));
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

// export function changeQuantityData(data, region) {
//     return async function changeQuantityDataThunk(dispatch, getState) {
//         dispatch(setCompleteOrderListData([]));
//         dispatch(setStatus(STATUSES.LOADING));
//         dispatch(setError(''));
//         try {
//             const responseData = await changeQuantityDataApi(data);
//             dispatch(setOrderListData(responseData));
//             dispatch(setStatus(STATUSES.IDLE));
//             dispatch(fetchCartListData(region))
//         } catch (err) {
//             dispatch(setError(err.toString()));
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }