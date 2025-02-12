const { createSlice } = require('@reduxjs/toolkit');
import apiService from "../Service/Api";
import { getLikedReelsApi } from "../Service/FavoriteReelApi/FavoriteReelApi";
import { STATUSES } from "./objects";

const likeReelSlice = createSlice({
    name: 'likeReel',
    initialState: {
        likedReelsData: [],
        status: STATUSES.IDLE,
        error: ''
    },
    reducers: {
        setLikeReelData(state, action) {
            state.likedReelsData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setLikeReelData, setStatus } = likeReelSlice.actions;
export default likeReelSlice.reducer;

export function fetchLikeReelData() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const response = await getLikedReelsApi();
            console.log("=======response:liked reels:::", response)
            dispatch(setLikeReelData(response));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log("Liked reels fetch error:", err)
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}