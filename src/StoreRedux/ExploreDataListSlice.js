import { getExploreApi } from '../Service/ExploreApi/ExploreApiServices';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');

const ExploreDataListSlice = createSlice({
    name: 'exploreDataList',
    initialState: {
        exploreDataList: [],
        status: STATUSES.IDLE,
        totalCount: 0,
        error: ''
    },
    reducers: {
        setExploreFilterTags(state, action) {
            const { id } = action.payload;
            const updatedFilterListData = state.exploreDataList.map(item => {
                if (item.id === id) {
                    return { ...item, selected: true };
                } else {
                    return { ...item, selected: false };
                }
            });
            state.exploreDataList = updatedFilterListData;
        },
        setExploreData(state, action) {
            const { newData, page } = action.payload;

            if (page > 1) {
                // Append the new data to the existing data
                state.exploreDataList = [...state.exploreDataList, ...newData];
            } else {
                // Replace the data if it's the first page
                state.exploreDataList = newData;
            }
        },
        resetExploreData() {
            // Reset to the initial state
            return {
                exploreDataList: [],
                status: STATUSES.IDLE,
                error: ''
            }
        },
        setExploreTotalCount(state, action) {
            // Update the totalCount in the state
            state.totalCount = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setExploreFilterTags, setExploreData, setExploreTotalCount, resetExploreData, setStatus, setError } = ExploreDataListSlice.actions;
export default ExploreDataListSlice.reducer;

export function fetchExploreData(city, SubType, page) {
    console.log("city, SubType, page======", city, SubType, page)
    return async function fetchExploreDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const { response, headers } = await getExploreApi(city, SubType, page);
            // console.log("response, headers::::", response, headers["x-total-count"])
            dispatch(setExploreTotalCount(Number(headers["x-total-count"])));
            dispatch(setExploreData({ newData: response, page: page }));
            dispatch(setStatus(STATUSES.IDLE));
            console.log("EEEE 2222222222")
        } catch (err) {
            dispatch(setStatus(err));
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}