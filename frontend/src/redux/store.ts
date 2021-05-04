import { applyMiddleware, createStore } from "redux";
import thunk  from "redux-thunk";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppState = ReturnType<typeof rootReducer>;

export default store
