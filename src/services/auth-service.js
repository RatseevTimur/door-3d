import axios from "axios";
import Cookies from "js-cookie";
import { parseJwt } from "../utils/jwt-parse";
// import authHeader from "./headers";

const API_URL = `${process.env.REACT_APP_BACK_PROTOCOL}://${process.env.REACT_APP_BACK_AUTH}:${process.env.REACT_APP_BACK_PORT}/auth/`;

export const loginService = (loginData) => {
    return axios.post(API_URL + 'login', loginData)
        .then((resp)=>{
            console.log(resp);

            const decodeJWT = parseJwt(resp.data.token);
            const tokenExpDate = new Date(decodeJWT.exp * 1000);

            Cookies.set('user_id', resp.data.id);
            Cookies.set('username', resp.data.username);
            Cookies.set('token', resp.data.token, {expires: tokenExpDate});
            return resp.data
        });
}

export const logoutService = () => {
    return axios.post(API_URL + 'logout')
        .then(()=>{
            Cookies.remove('user_id');
            Cookies.remove('username');
            Cookies.remove('token');
        });
}