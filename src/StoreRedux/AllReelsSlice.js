const { createSlice } = require('@reduxjs/toolkit');
import { fetchData, reelsLikeDislikeApi } from "../Service/ApiService";
import { STATUSES } from "./objects";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        reelData: [],
        status: STATUSES.IDLE,
        totalCount: 0,
        error: ''
    },
    reducers: {
        setReelsData(state, action) {
            const { newData, page } = action.payload;
            if (page > 1) {
                // Append the new data to the existing data
                state.data = [...state.data, ...newData];
                state.reelData = newData;
            } else {
                // Replace the data if it's the first page
                state.data = newData;
                state.reelData = newData;
            }
        },
        setTotalCount(state, action) {
            // Update the totalCount in the state
            state.totalCount = action.payload;
        },
        resetReelsData() {
            // Reset to the initial state
            return {
                data: [],
                status: STATUSES.IDLE,
                totalCount: 0,
                reelData: []
            };
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.status = action.payload;
        },
        updateReelLikeStatus(state, action) {
            const { reelId, liked } = action.payload;
            const reelIndex = state.data.findIndex(reel => reel._id === reelId);
            if (reelIndex !== -1) {
                // Update the liked status
                state.data[reelIndex].liked = liked;
                // Update the likeCount based on the liked status
                if (liked) {
                    state.data[reelIndex].likeCount += 1;
                } else {
                    state.data[reelIndex].likeCount -= 1;
                }
            }
        },
    },
});

export const { setReelsData, setError, updateReelLikeStatus, setTotalCount, resetReelsData, setStatus } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts(tag, page) {
    console.log("tag, pagetag, pagetag, pagetag, page::::", tag, page)
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            let api = tag ? `/get-all-videos?tags=${tag}&page=${page}` : `/get-all-videos?page=${page}`
            const { responseData, headers } = await fetchData(api);
            // console.log("responseDataresponseDataresponseDatapage::::", responseData)

            dispatch(setReelsData({ newData: responseData.videosWithLikes, page }));
            dispatch(setTotalCount(Number(headers["x-total-count"]))); // Store X-Total-Count in the state
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log("fetchData  RESSS:::errorerror:", err)

            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function likeReelAction(reelId) {
    return async function likeReelThunk(dispatch) {
        try {
            const api = `/api/reel/like/${reelId}`; // API endpoint to like the reel
            const message = await reelsLikeDislikeApi(api); // Assuming POST method for liking a reel
            message && dispatch(updateReelLikeStatus({ reelId, liked: true }));
        } catch (err) {
            console.error("Error liking the reel:", err);
            dispatch(setError(err));
        }
    };
}

export function dislikeReelAction(reelId) {
    return async function dislikeReelThunk(dispatch) {
        try {
            const api = `/api/reel/unlike/${reelId}`; // API endpoint to dislike the reel
            const message = await reelsLikeDislikeApi(api); // Assuming POST method for liking a reel
            message && dispatch(updateReelLikeStatus({ reelId, liked: false }));
        } catch (err) {
            console.error("Error disliking the reel:", err);
        }
    };
}