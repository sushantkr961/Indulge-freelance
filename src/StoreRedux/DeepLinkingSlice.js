import { getDeeplinkDetailsApi } from '../Service/DeeplinkApi/DeeplinkApiServices';
import { STATUSES } from './objects';
const { createSlice } = require('@reduxjs/toolkit');

const DeepLinkingSlice = createSlice({
    name: 'deeplinkDetails',
    initialState: {
        deeplinkDetails: {},
        status: STATUSES.IDLE,
        error: '',
        deepLinking: { isFromDeepLinking: false, path: '', id: '' },
        deeplinkURL: `https://indulgeconcierge.com/app`
    },
    reducers: {
        setDeeplinkDetailsData(state, action) {
            state.deeplinkDetails = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setIsFromDeeplinking(state, action) {
            state.deepLinking = action.payload;
        }
    },
});

export const {
    setDeeplinkDetailsData, setStatus, setError, setIsFromDeeplinking
} = DeepLinkingSlice.actions;
export default DeepLinkingSlice.reducer;

export function fetchDeeplinkDetailsData(path, id) {
    return async function fetchDeeplinkDetailsDataThunk(dispatch, getState) {
        dispatch(setDeeplinkDetailsData({}));
        dispatch(setStatus(STATUSES.LOADING));
        dispatch(setError(''));
        try {
            const responseData = await getDeeplinkDetailsApi(path, id);
            console.log("getDeeplinkDetailsApi==responseData", responseData);

            dispatch(setDeeplinkDetailsData(responseData));
        } catch (err) {
            console.log("responseData::err", err)
            dispatch(setStatus(STATUSES.ERROR));
            dispatch(setError(err));
        }
    };
}

