import Cookies from "js-cookie";
import { LOGIN_SUCCESS, LOGOUT } from "../types";

const user_id = Cookies.get('user_id');
const username = Cookies.get('username');
const token = Cookies.get('token');

const initialState = {
    user_id: user_id ? user_id : null,
    username: username ? username : null,
    token: token ? token : null,
}

export default function authReducer (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user_id: payload.id,
                username: payload.username,
                token: payload.token,
            }
        case LOGOUT:
            return {
                ...state,
                user_id: null,
                username: null,
                token: null,
            }
        default:
            return state
    }

};