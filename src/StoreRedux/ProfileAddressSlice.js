import { createSlice } from '@reduxjs/toolkit';

const profileAddressSlice = createSlice({
    name: 'profileAddress',
    initialState: [
        // {
        //     "addressId": 0,
        //     "addressType": "Home",
        //     "address": "12-11-171/1/10 flat no 104, Hyderabad, Telangana India 500061",
        //     "isCurrent": true
        // },
        // {
        //     "addressId": 1,
        //     "addressType": "Office",
        //     "address": "12-11-171/1/10 flat no 104, Hyderabad, Telangana India 500062",
        //     "isCurrent": false
        // },
        // {
        //     "addressId": 2,
        //     "addressType": "Other",
        //     "address": "12-11-171/1/10 flat no 104, Hyderabad, Telangana India 500063",
        //     "isCurrent": false
        // }
    ],
    reducers: {
        addProfileAddress(state, action) {
            const newAddress = action.payload;
            const existingAddressIndex = state.findIndex(address =>
                address.addressType === newAddress.addressType
            );
            if (existingAddressIndex !== -1) {
                // If an address with the same address type exists, update it
                newAddress.addressId = existingAddressIndex;
                if (newAddress.isCurrent === true) {  // Update isCurrent for existing addresses
                    state.forEach(address => {
                        address.isCurrent = false;
                    });
                }
                state[existingAddressIndex] = newAddress;
            } else {
                // If not, add the new address
                const lastAddressId = state.length > 0 ? state[state.length - 1].addressId : 0;
                newAddress.addressId = lastAddressId + 1;
                if (newAddress.isCurrent === true) {  // Update isCurrent for existing addresses
                    state.forEach(address => {
                        address.isCurrent = false;
                    });
                }
                state.push(newAddress);
            }
        },
        deleteProfileAddress(state, action) {
            const addressIdToDelete = action.payload;
            // Find the index of the address to delete
            const addressIndex = state.findIndex(address => address.addressId === addressIdToDelete);
            // If address is found, delete it from the state
            if (addressIndex !== -1) {
                state.splice(addressIndex, 1);
            }
        }
    },
});

export const { addProfileAddress, deleteProfileAddress } = profileAddressSlice.actions;
export default profileAddressSlice.reducer;
