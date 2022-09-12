import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { Movie } from "../types";

// Define a type for the slice state
interface MyListState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  data: Movie[]
}

// Define the initial state using that type
const initialState: MyListState = {
  isLoading: true,
  isSuccess: false,
  isError: false,
  data: [],
}

export const MyList = createSlice({
  name: 'myList',
  initialState,
  reducers: {
    addMyList: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true, 
        data: action.payload
      }
    },
    RemoveMyList: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false, 
        isError: true,
        data: state.data.filter(item => item.id !== action.payload)
      }
    },
    MyListSuccess: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true, 
        data: action.payload
      }
    },
    MyListFailed: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false, 
        isError: true,
        data: []
      }
    },
  }
})

export const { addMyList, MyListSuccess, MyListFailed, RemoveMyList } = MyList.actions

// Other code such as selectors can use the imported `RootState` type
export const myListvalue = (state: RootState) => state.myList.data

export default MyList.reducer