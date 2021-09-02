import {configureStore} from '@reduxjs/toolkit';
import searchSlice from './SearchSlice';

export const store =  configureStore({
    reducer:{
        search: searchSlice.reducer
    }
});
