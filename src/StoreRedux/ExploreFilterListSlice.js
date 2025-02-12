import { getExploreFilterListApi } from '../Service/ExploreApi/ExploreApiServices';
import { STATUSES } from './objects';
import { setShopFilterListData } from "./ShopFilterListSlice"
const { createSlice } = require('@reduxjs/toolkit');
const initialState = {
    exploreFilterListData: [
        // { id: 0, name: "Bangkok", selected: false },
        // { id: 1, name: "Paris", selected: false },
        // { id: 2, name: "London", selected: false },
        // { id: 3, name: "Dubai", selected: false },
        // { id: 4, name: "Singapore", selected: false },
        // { id: 5, name: "New York City", selected: false },
        // { id: 6, name: "Kuala Lumpur", selected: false },
        // { id: 7, name: "Istanbul", selected: false },
        // { id: 8, name: "Tokyo", selected: false },
        // { id: 9, name: "Seoul", selected: false },
        // { id: 10, name: "Barcelona", selected: false },
        // { id: 11, name: "+More", selected: false },
    ],
    exploreSubFilterListData: [
        { id: 0, name: "Restaurants", selected: false, value: "Restaurants" },
        { id: 1, name: "Activities", selected: false, value: "Activities" },
        { id: 2, name: "Kid’s Friendly", selected: false, value: "KID’S FRIENDLY" }
    ],
    status: STATUSES.IDLE,
    error: '',
};

const ExploreFilterListSlice = createSlice({
    name: 'exploreFilterList',
    initialState: initialState,
    reducers: {
        setExploreFilterTags(state, action) {
            const { id } = action.payload;
            const updatedFilterListData = state.exploreFilterListData.map(item => {
                if (item.id === id) {
                    return { ...item, selected: true };
                } else {
                    return { ...item, selected: false };
                }
            });
            state.exploreFilterListData = updatedFilterListData;
        },
        resetExploreFilterTags(state) {
            state.exploreFilterListData = initialState.exploreFilterListData;
        },
        setExploreFilterListData(state, action) {
            const updatedFilterListData = action.payload.map((item, index) => {
                return {
                    id: index,
                    name: item.name,
                    selected: index === 0,
                    active: item.active
                };
            })
            // console.log("exploreFilterListData::", action.payload, updatedFilterListData)
            state.exploreFilterListData = updatedFilterListData
        },
        setExploreSubFilterTags(state, action) {
            const { id } = action.payload;
            // console.log('exploreSubFilterListData ==== ',action.payload)
            const updatedFilterListData = state.exploreSubFilterListData.map(item => {
                if (item.id === id) {
                    return { ...item, selected: true };
                } else {
                    return { ...item, selected: false };
                }
            });
            state.exploreSubFilterListData = updatedFilterListData;
        },
        resetExploreSubFilterTags(state) {
            state.exploreSubFilterListData = initialState.exploreSubFilterListData;
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
    setExploreFilterTags,
    resetExploreFilterTags,
    setExploreSubFilterTags,
    resetExploreSubFilterTags,
    setExploreFilterListData,
    setStatus,
    setError
} = ExploreFilterListSlice.actions;


export function fetchExploreFilterData(type) {
    return async function fetchExploreFilterDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getExploreFilterListApi(type);
            if (type === "ECOMMERCE") {
                console.log('ECOMMERCE')
                dispatch(setShopFilterListData(responseData))
            }
            else {
                dispatch(setExploreFilterListData(responseData))
            }


            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export default ExploreFilterListSlice.reducer;
