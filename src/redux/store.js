// import { configureStore } from '@reduxjs/toolkit'
// import idCatReducer from './idCatSlice'
// import editorReducer from './editorSlice.js'
// import createReducer from './newProblemSlice.js'
// import searchReducer from './reducers/categoryProblems.js'

import { configureStore, compose, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

import reducer from './reducers';

// export default configureStore({
//   reducer: {
//     categoryid: idCatReducer,
//     editor: editorReducer,
//     createProblem: createReducer,
//     searchProblem: searchReducer
//   },
// })

// let old = {
//     categoryid: idCatReducer,
//     editor: editorReducer,
//     createProblem: createReducer,
//     searchProblem: searchReducer
//   }

// let reducer = Object.assign(reduc, old)
// console.log("reducer", reducer)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = configureStore({
//     reducer: {...reducer, ...old}
//     },
//     composeEnhancers(applyMiddleware([thunk]))
// );

const store = configureStore(
    {reducer},
    composeEnhancers(applyMiddleware([thunk]))
);

export default store;
