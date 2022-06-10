import {
    combineReducers,
    legacy_createStore as createStore,
  } from "redux";

  import { filterReducer } from "./filterReducer";
  import { cartReducer } from "./cartReducer";
const rootReducer = combineReducers({
    products: filterReducer,
    basket: cartReducer,
  });

export const store = createStore(rootReducer);