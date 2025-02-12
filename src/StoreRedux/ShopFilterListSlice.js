const { createSlice } = require('@reduxjs/toolkit');
import { getExploreFilterListApi } from '../Service/ExploreApi/ExploreApiServices';
import { STATUSES } from './objects';
const initialState = {
    filterListData: [
        { id: 0, name: "Featured", selected: true },
        // { id: 1, name: "Auctions", selected: false },
        // { id: 2, name: "Global Events", selected: false },
        // { id: 3, name: "Art", selected: false },
        // { id: 4, name: "Flowers and cakes", selected: false },
        // { id: 5, name: "Gourmet", selected: false },
        // { id: 6, name: "Watches", selected: false },

        // { id: 3, name: "Perfumes", selected: false },

        // { id: 7, name: "Bags", selected: false },

        // { id: 4, name: "Flowers and cakes", selected: false },

        // { id: 8, name: "Collectibles", selected: false },
        // { id: 9, name: "Auto Jet Sail", selected: false },

        // { id: 10, name: "Travel", selected: false },

        // { id: 11, name: "Fashion", selected: false },
        // { id: 12, name: "Homes", selected: false },
        // { id: 13, name: "Beauty and Fragrance", selected: false },
        // { id: 14, name: "Stationery", selected: false },

        // { id: 13, name: "Women’s Fashion", selected: false },
        // { id: 14, name: "Homes", selected: false },
        // { id: 15, name: "Beauty and Fragrance", selected: false },
        // { id: 16, name: "Stationery", selected: false },
        // { id: 17, name: "Pets", selected: false },
        // { id: 18, name: "Cigar", selected: false },
        // { id: 19, name: "Cars", selected: false },
        // { id: 20, name: "Sneakers", selected: false },
    ]
};

const ShopFilterListSlice = createSlice({
    name: 'shopFilterList',
    initialState: initialState,
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
        resetFilterTags(state) {
            state.filterListData = initialState.filterListData;
        },
        setShopFilterListData(state, action) {
            // console.log('setShopFilterListData ==== ',action.payload)
            const updatedFilterListData = action.payload.map((item, index) => {
                return {
                    id: index,
                    name: item.name,
                    selected: index == 0 ? true : false,
                    active: item.active
                };
            })
            // console.log("exploreFilterListData::", updatedFilterListData)
            state.filterListData = updatedFilterListData
        },
    },
});

export const { setFilterTags, resetFilterTags, setShopFilterListData } = ShopFilterListSlice.actions;



export default ShopFilterListSlice.reducer;

