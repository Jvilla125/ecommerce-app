import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";

// when action is called, we invoke reducer to return a changed state

export const userRegisterLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userInfo: action.payload,
            }
            case LOGOUT_USER:
                return {};
        default:
            return state
    }
}