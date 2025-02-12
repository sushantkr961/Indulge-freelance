import { changeQuantityDataApi, getCartListApi } from '../Service/CartApi/CartApiServices';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');

const CartListSlice = createSlice({
    name: 'cartList',
    initialState: {
        cartList: {},
        status: STATUSES.IDLE,
        error: ''
    },
    reducers: {
        setCartListData(state, action) {
            state.cartList = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setCartListData, setStatus, setError } = CartListSlice.actions;
export default CartListSlice.reducer;

export function fetchCartListData(region) {
    return async function fetchCartListDataThunk(dispatch, getState) {
        dispatch(setCartListData([]));
        dispatch(setStatus(STATUSES.LOADING));
        dispatch(setError(''));
        try {
            const responseData = await getCartListApi(region);
            dispatch(setCartListData(responseData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setError(err));
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function changeQuantityData(data, region) {
    return async function changeQuantityDataThunk(dispatch, getState) {
        dispatch(setCartListData([]));
        dispatch(setStatus(STATUSES.LOADING));
        dispatch(setError(''));
        try {
            const responseData = await changeQuantityDataApi(data);
            dispatch(setCartListData(responseData));
            dispatch(setStatus(STATUSES.IDLE));
            dispatch(fetchCartListData(region))
        } catch (err) {
            dispatch(setError(err));
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}