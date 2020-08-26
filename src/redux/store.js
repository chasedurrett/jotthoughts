import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import promiseMiddleware from "redux-promise-middleware";
import { devToolsEnhancer } from "redux-devtools-extension";

const composedEnhancers = compose(
  applyMiddleware(promiseMiddleware),
  devToolsEnhancer()
);

export default createStore(reducer, undefined, composedEnhancers);
