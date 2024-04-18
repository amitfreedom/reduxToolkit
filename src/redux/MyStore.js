import { combineReducers, configureStore } from "@reduxjs/toolkit";
import MyProductReducer from "./MyProductSlice";
import MyPostsReducer from "./PostSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  
};
const rootReducer = combineReducers({
    product:MyProductReducer,
    postlist:MyPostsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const MyStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        // immutableCheck: false,
        // serializableCheck: false,
      }),
  });

// export const MyStore = configureStore({
//     reducer:{
//         product:MyProductReducer
//     }
// });