import { configureStore } from '@reduxjs/toolkit';
import {notesSlice} from './reducers';
let store =  configureStore({
    reducer: {
      notesReducer: notesSlice.reducer
    },
  })
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;