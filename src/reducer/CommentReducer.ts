import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { CommentAllData } from '../types/data'

// Define the initial state using that type
const initialState: Array<CommentAllData> = [
  {
  photo: {
    albumId: 2,
    id: 1,
    title: "soluta et harum aliquid officiis ab omnis consequatur",
    url: "https://via.placeholder.com/600/6efc5f",
    thumbnailUrl: "https://via.placeholder.com/150/6efc5f"},
    comment: [{
      id: 1,
      user: "okta 1",
      description: "desc 1",
      date: 'Mon, 30 Aug 2021 12:10:59'
    }]
  },
  {
    photo: {
      albumId: 2,
      id: 2,
      title: "soluta et harum aliquid officiis ab omnis consequatur",
      url: "https://via.placeholder.com/600/6efc5f",
      thumbnailUrl: "https://via.placeholder.com/150/6efc5f"},
      comment: [{
        id: 1,
        user: "okta 2",
        description: "desc 2",
        date: 'Mon, 30 Aug 2021 12:10:59'
      }]
    }
]

export const CommentReducer = createSlice({
  name: 'Comment User',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNewComment: (state, action: PayloadAction<CommentAllData>) => {
      state.push(action.payload)
    }
  }
})

export const { addNewComment } = CommentReducer.actions

// Other code such as selectors can use the imported `RootState` type
export const selectComment = (state: RootState) => state;

export default CommentReducer.reducer