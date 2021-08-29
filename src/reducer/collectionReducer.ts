import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { PhotosData } from '../types/data'

// Define the initial state using that type
const initialState: Array<PhotosData> = []

export const collectionReducer = createSlice({
  name: 'favourite photo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCollection: (state, action: PayloadAction<PhotosData>) => {
      if(!state.find(fav =>  fav.id === action.payload.id)) {
        state.push(action.payload)
      }
    }
  }
})

export const { addCollection } = collectionReducer.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCollection = (state: RootState) => state;

export default collectionReducer.reducer