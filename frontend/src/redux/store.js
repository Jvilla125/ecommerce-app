// npm install redux so we can have a global state that can be shared across other components
import { createStore, combineReducers, applyMiddleware } from "redux";
// import the following google extension to view the global state while inspecting webpage
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

import { counterReducer } from './reducers/cartReducers'

const reducer = combineReducers({
    cart: counterReducer
})

const middleware = [thunk]
const store = createStore(reducer, { cart: { value: 0 } }, composeWithDevTools(applyMiddleware(...middleware)))

export default store;