import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducer from "../reducer/index";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
