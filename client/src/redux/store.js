import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./errorSlice";
import userReducer from "./userSlice";
import dataReducer from "./dataSlice";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  data: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
