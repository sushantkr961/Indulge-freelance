const { createSlice } = require('@reduxjs/toolkit');

const profileNotesSlice = createSlice({
    name: 'profileNotes',
    initialState: {
        profileNotes: '',
    },
    reducers: {
        setProfileNotes(state, action) {
            state.profileNotes = action.payload;
        }
    },
});

export const { setProfileNotes } = profileNotesSlice.actions;
export default profileNotesSlice.reducer;

