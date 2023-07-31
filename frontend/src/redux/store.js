// npm install redux so we can have a global state that can be shared across other components
import { createStore, combineReducers, applyMiddleware } from "redux";
// import the following google extension to view the global state while inspecting webpage
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

// Reducers are in charge of returning a global changed state 
import { cartReducer } from './reducers/cartReducers'
import { userRegisterLoginReducer } from "./reducers/userReducers";
import { getCategoriesReducer } from "./reducers/categoryReducer";
import { adminChatReducer } from "./reducers/adminChatReducer";

// combineReducers allows you to return various reducers instead of one
const reducer = combineReducers({
    cart: cartReducer,
    userRegisterLogin: userRegisterLoginReducer,
    getCategories: getCategoriesReducer,
    adminChat: adminChatReducer,
})

const cartItemsInLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

const userInfoInLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : sessionStorage.getItem("userInfo")
        ? JSON.parse(sessionStorage.getItem("userInfo"))
        : {}

const INITIAL_STATE = {
    cart: {
        cartItems: cartItemsInLocalStorage,
        itemsCount: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((quantity, item) => Number(item.quantity) + quantity, 0) : 0,
        cartSubtotal: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((price, item) => price + item.price * item.quantity, 0) : 0,
    },
    userRegisterLogin: { userInfo: userInfoInLocalStorage }
}

const middleware = [thunk]
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)))

export default store;