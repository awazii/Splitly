import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FriendsReducer from "./FriendsSlice";
import GroupReducer from "./GroupSlice";
import ExpenseReducer from "./ExpenseSlice";
import SpliterReducer from './SpliterSlice';
import ActivityReducer from "./ActivitySlice";
import { Spliter } from "../Components/Spliter/Spliterform/Spliter";
import userReducer from "./UserSlice";
const rootReducer = combineReducers({
  Friends: FriendsReducer,
  Groups: GroupReducer,
  Expenses: ExpenseReducer,
  Spliter:SpliterReducer,
  user: userReducer,
  Activity: ActivityReducer
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
export { store };
export const persistor = persistStore(store);