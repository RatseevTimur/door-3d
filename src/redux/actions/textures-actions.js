import { TEXTURE_SELECT, TEXTURE_NULL } from '../types';
import { textureSelectService, textureNullService } from '../../services/texture-service';

export const textureAction = (loginData) => (dispatch) => {
    return textureSelectService(loginData).then(
        (data) => {
            dispatch({
                type: TEXTURE_SELECT,
                payload: data
            });
            return Promise.resolve();
        },
        (error) => {
            console.log("TEXTURE_FAIL " + error);
            dispatch({
                type: TEXTURE_NULL
            });
            return Promise.reject();
        }
    );
};

export const textureNullAction = () => (dispatch) => {
    return ( 
        textureNullService().then(() => {
            dispatch({ type: TEXTURE_NULL });
            return Promise.resolve();
        })
    )
}