import { getExploreCarouselApi, getShopCarouselApi } from '../Service/ShopExploreCarouselApi/ShopExploreCarouselApiServices';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');

const GetEcomAndExploreCarosalImageSlice = createSlice({
    name: 'getEcomAndExploreCarosalImageSlice',
    initialState: {
        shopCarosalList: [],
        exploreCarosalList: [],
        status: STATUSES.IDLE,
        error: ''
    },
    reducers: {
        setShopCarouselData(state, action) {
            state.shopCarosalList = action.payload;
        },
        setExploreCarouselData(state, action) {
            state.exploreCarosalList = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setShopCarouselData, setExploreCarouselData, setStatus, setError } = GetEcomAndExploreCarosalImageSlice.actions;
export default GetEcomAndExploreCarosalImageSlice.reducer;

export function fetchShopCarouselData(category, active) {
    return async function fetchShopCarouselDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getShopCarouselApi(category, active);
            dispatch(setShopCarouselData(responseData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(err));
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export function fetchExploreCarouselData(category, active) {
    return async function fetchExploreCarouselDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getExploreCarouselApi(category, active);
            dispatch(setExploreCarouselData(responseData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(err));
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}