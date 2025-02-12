import { createSlice } from '@reduxjs/toolkit';

const initialData = {
    selectedFilterData: [],
    allFilterData: [
        'Featured',
        'Art',
        'Gourmet',
        'Watches',
        'Bags',
        'Collectibles',
        'Global Events',
        'Auto Jet Sail',
        'Fashion',
        'Homes',
        'Beauty and Fragrance',
        'Stationery'
    ]
}
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialData,
    reducers: {
        toggleSelection: (state, action) => {
            const index = state.selectedFilterData.indexOf(action.payload);

            if (index !== -1) {
                // If the string is already in the array, remove it
                state.selectedFilterData.splice(index, 1);
            } else {
                // If the string is not in the array, add it
                state.selectedFilterData.push(action.payload);
            }
        },
        resetTagState: (state) => {
            // Reset the state to its initial value
            state.selectedFilterData = [];
        },
    },
});

export const { toggleSelection, resetTagState } = filterSlice.actions;
export default filterSlice.reducer;