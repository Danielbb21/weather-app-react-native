import { createSlice } from '@reduxjs/toolkit';

const initialState = [{
    city: '',
    state: '',
    contry: ''
}];
const items = [];

const searchSlice = createSlice({
    name: 'search',
    initialState: items,
    reducers: {
        addSearch(state, action) {
            const newSearch = action.payload;
            console.log('NEW SEARCH', newSearch);
            console.log('state', state);
            if (state.length < 3) {
                state.unshift(newSearch);
            }
            else {
                state.pop();
                state.unshift(newSearch);
            }
        }
    }
});
export const searchActions = searchSlice.actions;

export default searchSlice;
