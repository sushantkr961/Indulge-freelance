const { createSlice } = require('@reduxjs/toolkit');
import { getMyPlansApi } from "../Service/MyPlansApi/MyPlansApiServices";
import { STATUSES } from "./objects";

const MyPlansSlice = createSlice({
    name: 'myPlans',
    initialState: {
        myPlansData: [],
        status: STATUSES.IDLE,
        error: ''
    },
    reducers: {
        setMyPlansData(state, action) {
            state.myPlansData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setMyPlansData, setStatus } = MyPlansSlice.actions;
export default MyPlansSlice.reducer;

export function fetchMyPlansData() {
    console.log("=======setMyPlansData:::")
    return async function fetchMyPlansThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await getMyPlansApi();
            console.log("=======setMyPlansData::;:", response)
            dispatch(setMyPlansData(response));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log("Fetch MyCouponData reels fetch error:", err)
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}