import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";
import axios from "axios";
//action calls reducer which will change the state of the global state

export const setReduxUserState = (userCreated) => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
        payload: userCreated
    })
}

// this function will need to be imported by another component
export const logout = () => (dispatch) => {
    document.location.href = "/login"; // 
    axios.get("/api/logout"); // get from routes/apiRoutes
    localStorage.removeItem("userInfo"); //remove cookie from localStorage 
    sessionStorage.removeItem("userInfo"); //or remove cookie from sessionStorage
    localStorage.removeItem("cart"); //if we logout we want to clear the cart as well
    dispatch({ type: LOGOUT_USER }) // this dispatch calls userReducer.js
}