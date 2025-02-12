const { createSlice } = require('@reduxjs/toolkit');
import { fetchNotificationDataApi } from "../Service/ApiService";
import { clearNotificationDataApi } from "../Service/NotificationsApi/NotificationsApiServices";
import { STATUSES } from "./objects";

const CalendarNotificationsSlice = createSlice({
    name: 'calendarNotificationsSlice',
    initialState: {
        calendarNotificationsData: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setNotificationData(state, action) {
            state.calendarNotificationsData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setNotificationData, setStatus } = CalendarNotificationsSlice.actions;
export default CalendarNotificationsSlice.reducer;

export function fetchNotificationData(userId) {
    return async function fetchNotificationDataThunk(dispatch, getState) {
        dispatch(setNotificationData([]));
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await fetchNotificationDataApi(userId);
            dispatch(setNotificationData(responseData));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
export function clearNotificationData(userId) {
    return async function clearNotificationDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await clearNotificationDataApi(userId);
            if (responseData)
                dispatch(setNotificationData([]));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}
