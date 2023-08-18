import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userSlice } from './userSlice'
import { chatsSlice } from './chatsSlice'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const combinedReducers = combineReducers({
  user: userSlice.reducer,
  chats: chatsSlice.reducer
}) 

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch