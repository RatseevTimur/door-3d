import { TEXTURE_LOAD, TEXTURE_NULL } from '../types';
import { textureService } from '../../services/texture-service';

export const textureAction = (itemId) => (dispatch) => {
    return textureService(itemId).then(
        (data) => {
            dispatch({
                type: TEXTURE_LOAD,
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