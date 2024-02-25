import { LOGIN_SUCCESS, LOGOUT } from '../types';
import { loginService, logoutService } from '../../services/auth-service';

export const loginAction = (loginData) => (dispatch) => {
    return loginService(loginData).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
            return Promise.resolve();
        },
        (error) => {
            console.log("LOGIN_FAIL " + error);
            dispatch({
                type: LOGOUT
            });
            return Promise.reject();
        }
    );
};

export const logoutAction = () => (dispatch) => {
    return ( 
        logoutService().then(() => {
            dispatch({ type: LOGOUT });
            return Promise.resolve();
        })
    )
}