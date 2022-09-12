import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { Movie } from "../types";

// Define a type for the slice state
interface SearchState {
  isSearch: boolean,
  value: string,
  data: Movie[]
  page: number,
}

// Define the initial state using that type
const initialState: SearchState = {
  isSearch: false,
  value: '',
  data: [],
  page: 1,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchSuccess: (state, action: PayloadAction<any>) => {
      state.isSearch = true
      state.value = action.payload.value
      state.data = action.payload.data
      state.page = action.payload.page
    },
    searchFailed: (state, action: PayloadAction<any>) => {
      state.isSearch = false,
      state.value = action.payload,
      state.data = []
    }
  }
})

export const { searchSuccess, searchFailed } = searchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isSarchValue = (state: RootState) => state.search.isSearch

export default searchSlice.reducer