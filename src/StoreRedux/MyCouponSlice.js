const { createSlice } = require('@reduxjs/toolkit');
import { getMyCouponApi } from "../Service/MyCouponApi/MyCouponApiServices";
import { STATUSES } from "./objects";

const MyCouponSlice = createSlice({
    name: 'myCoupon',
    initialState: {
        myCouponData: [],
        status: STATUSES.IDLE,
        error: ''
    },
    reducers: {
        setMyCouponData(state, action) {
            state.myCouponData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setMyCouponData, setStatus } = MyCouponSlice.actions;
export default MyCouponSlice.reducer;

export function fetchMyCouponData() {
    console.log("=======fetchMyCouponData:::")
    return async function fetchProductThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await getMyCouponApi();
            console.log("=======fetchMyCouponData::;:", response)
            dispatch(setMyCouponData(response));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log("Fetch MyCouponData reels fetch error:", err)
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}