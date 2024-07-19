import { combineReducers } from "redux";
import categorySlice from "./categorySlice";

const reducers = combineReducers({
category:categorySlice,});

export default reducers;