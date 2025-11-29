import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import AuthSlice from "./AuthSlice.js";
import PostSlice from "./PostSlice.js";
import SocketSlice from "./SocketSlice.js";
import chatSlice from "./chatSlice.js";
import RTNSlice from "./RTNSlice.js";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // Exclude socketio from persistence since socket connections can't be serialized
    blacklist: ['socketio'],
  }
  const rootReducer = combineReducers({
    auth: AuthSlice,
    post: PostSlice, 
    socketio: SocketSlice,
    chat: chatSlice,
    realTimeNotification: RTNSlice
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types (socket actions contain non-serializable socket objects)
          ignoredActions: [
            FLUSH, 
            REHYDRATE, 
            PAUSE, 
            PERSIST, 
            PURGE, 
            REGISTER,
            'socket/setSocket', // Socket objects are not serializable
          ],
          // Ignore these paths in the state (socket connection can't be serialized)
          ignoredPaths: ['socketio.socket'],
        },
      }),
});
export default store;