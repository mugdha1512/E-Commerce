import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";

const roottReducers = combineReducers({
    auth:authReducer

})

export const store = legacy_createStore(roottReducers, applyMiddleware(thunk))
