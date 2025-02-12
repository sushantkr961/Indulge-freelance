import { getShopProductsApi } from '../Service/ApiService';
import { STATUSES } from './objects';

const { createSlice } = require('@reduxjs/toolkit');

const ShopProductListSlice = createSlice({
    name: 'shopProductList',
    initialState: {
        shopProductList: [],
        status: STATUSES.IDLE,
        error: '',
        totalCountShopData: 0
    },
    reducers: {
        setFilterTags(state, action) {
            const { id } = action.payload;
            const updatedFilterListData = state.filterListData.map(item => {
                if (item.id === id) {
                    return { ...item, selected: true };
                } else {
                    return { ...item, selected: false };
                }
            });
            state.filterListData = updatedFilterListData;
        },
        setShopProductData(state, action) {
            const { newData, page } = action.payload;
            const expectedLength = page * 10;

            if (page > 1) {
                // Check if we already have enough data for the current page
                if (state.shopProductList.length >= expectedLength) {
                    // If we have enough data, don't append new data
                    return;
                }
                // Append the new data to the existing data
                state.shopProductList = [...state.shopProductList, ...newData];
            } else {

                // Replace the data if it's the first page
                state.shopProductList = newData;
            }
        },
        setShopDataTotalCount(state, action) {
            // Update the totalCount in the state
            state.totalCountShopData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        resetStateOfShopProduct(state) {
            state.shopProductList = [];
            state.status = STATUSES.IDLE;
            state.error = '';
            state.totalCountShopData = 0;
        },
    },
});

export const { setFilterTags, setShopDataTotalCount, resetStateOfShopProduct, setShopProductData, setStatus, setError } = ShopProductListSlice.actions;
export default ShopProductListSlice.reducer;

let currentRequestVersion = 0; // Tracks the latest request version

export function fetchShopProductData(tagName, page, priceRange, region) {
    return async function fetchShopProductDataThunk(dispatch, getState) {
        // Increment the request version
        const requestVersion = ++currentRequestVersion;

        // Reset state
        dispatch(setShopDataTotalCount(0));
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const { response, headers } = await getShopProductsApi(
                "ECOMMERCE",
                tagName,
                priceRange,
                region,
                page
            );

            console.log("Response for version", requestVersion, ":", response);

            // Only update state if this is the latest request
            if (requestVersion === currentRequestVersion) {
                dispatch(setShopDataTotalCount(Number(headers["x-total-count"])));
                dispatch(setShopProductData({ newData: response, page }));
                dispatch(setStatus(STATUSES.IDLE));
            } else {
                console.log("Ignored outdated response for version:", requestVersion);
            }
        } catch (err) {
            // Handle errors for the latest request only
            if (requestVersion === currentRequestVersion) {
                console.error("Error fetching data:", err.message);
                dispatch(setStatus(STATUSES.ERROR));
            } else {
                console.log("Ignored error for outdated request version:", requestVersion);
            }
        }
    };
}
