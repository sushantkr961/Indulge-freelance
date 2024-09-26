import { getWalletBalanceApi } from '../Service/PaymentApi/PaymentApiServices';
import { getProfileDetailsApi, getUserDetailsApi } from '../Service/ProfileApi/ProfileApiServices';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');

const ProfileDetailsSlice = createSlice({
    name: 'profileDetails',
    initialState: {
        profileDetails: {},
        status: STATUSES.IDLE,
        error: '',
        mobile_no: null,
        walletBalance: 0,
        region: '',
        currency: '',
        userId: '',
        countryCode: '',
        whatspLink: '',
        isWelcomeIsShown: false,
        isFromReginster: false,
        isHelpModalOpen: false,
        isShopTooltipOpen: false,
        isExploreTooltipOpen: false
    },
    reducers: {
        setProfileDetailsData(state, action) {
            state.profileDetails = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setMobileNo(state, action) {
            state.mobile_no = action.payload;
        },
        setRegion(state, action) {
            state.region = action.payload;
        },
        setCurrency(state, action) {
            state.currency = action.payload;
        },
        setWalletBalance(state, action) {
            state.walletBalance = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setCountryCode(state, action) {
            state.countryCode = action.payload;
        },
        setWhatspLink(state, action) {
            state.whatspLink = action.payload;
        },
        setIsWelcomeIsShown(state, action) {
            state.isWelcomeIsShown = action.payload;
        },
        setIsFromReginster(state, action) {
            state.isFromReginster = action.payload;
        },
        setIsHelpModalOpen(state, action) {
            state.isHelpModalOpen = action.payload;
        },
        setIsShopTooltipOpen(state, action) {
            state.isShopTooltipOpen = action.payload;
        },
        setIsExploreTooltipOpen(state, action) {
            state.isExploreTooltipOpen = action.payload;
        },
    },
});

export const {
    setIsShopTooltipOpen, setIsExploreTooltipOpen,
    setIsWelcomeIsShown, setIsFromReginster, setIsHelpModalOpen,
    setProfileDetailsData, setStatus, setError,
    setMobileNo, setRegion,
    setWalletBalance, setCurrency,
    setUserId, setCountryCode,
    setWhatspLink
} = ProfileDetailsSlice.actions;
export default ProfileDetailsSlice.reducer;

export function fetchProfileDetailsData(mobile_no, region, currency) {
    return async function fetchProfileDetailsDataThunk(dispatch, getState) {
        dispatch(setMobileNo(mobile_no))
        dispatch(setRegion(region))
        dispatch(setCurrency(currency))
        dispatch(setProfileDetailsData({}));
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseData = await getProfileDetailsApi(mobile_no);
            dispatch(setProfileDetailsData(responseData));
            dispatch(fetchWalletBalanceData(mobile_no, region))
            dispatch(fetchUserDetailsData(mobile_no))
        } catch (err) {
            console.log("responseData::err", err)
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchWalletBalanceData(mobile_no, region) {
    return async function fetchWalletBalanceDataThunk(dispatch, getState) {
        dispatch(setWalletBalance(0))
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseBlanceData = await getWalletBalanceApi(mobile_no, region);
            dispatch(setRegion(responseBlanceData.region))
            dispatch(setWalletBalance(responseBlanceData.customer_balance))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export function fetchUserDetailsData(mobile_no) {
    return async function fetchUserDetailsDataThunk(dispatch, getState) {
        dispatch(setUserId(''))
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const responseUserData = await getUserDetailsApi(mobile_no);
            dispatch(setUserId(responseUserData.user._id))
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}