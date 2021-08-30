import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import collectionReducer from '../reducer/collectionReducer';
import CommentReducer from '../reducer/CommentReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    collection: collectionReducer,
    commentData: CommentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
