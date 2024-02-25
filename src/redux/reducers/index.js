import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth-reducer";

import textureLoad from './texture-reducer'
import textureActive from './textures-reducer'
import modelActive from './model-properties'
import sceneState from './scene'

export default combineReducers({
    auth,
    textureLoad,
    // textureLoadSingle: textureLoad,
    textureSelected: textureActive,
    modelProperties: modelActive,
    scene: sceneState
});