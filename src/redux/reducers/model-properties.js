import { createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
// let modelProperties1 = {
//     forma: forma,
//     heightAll: 400,
//     widthAll: 1200,
//     thickness: 40,
//     end: ['s-end-1','s-end-2','s-end-3','s-end-4']
// };
// let modelProperties2 = {
//     forma: forma,
//     heightAll: 1200,
//     widthAll: 1500,
//     heightGorizonal: 500,
//     widthVertical: 600,
//     thickness: 40,
//     end: ['r-end-1','r-end-2','r-end-3','r-end-4','r-end-5','r-end-6']
// } 
// let modelProperties3 = {
//     forma: forma,
//     heightAll: 1500,
//     widthAll: 2000,
//     heightRight: 1000, //Высота правой части(снаружи)
//     widthRight: 600, //Ширина правой части П
//     heightInsideRight: 600, //Высота правой(внутр) части П
//     widthInside: 1000, //Ширина пространства внутри П
//     heightLeft: 1100, //П расчетная высота левой
//     widthLeft: 400, //П рысчетная ширина левой
//     thickness: 40, //Толщина
//     end: ['u-end-1','u-end-2','u-end-3','u-end-4','u-end-5','u-end-6','u-end-7','u-end-8']
// }

export const modelActive = createSlice({
  name: "modelProperties",
  initialState: {
    prop_Box_forma:{
      forma: 1,
      heightAll: 2000,
      widthAll: 800,
      thickness: 40,
      end: ['s-end-1','s-end-2','s-end-3','s-end-4'],
      cuts: [],
      chamfer: "V"
    },
    prop_G_forma:{
      forma: 2,
      heightAll: 1200,
      widthAll: 1500,
      heightGorizonal: 500,
      widthVertical: 600,
      thickness: 40,
      end: ['r-end-1', 'r-end-2', 'r-end-3', 'r-end-4', 'r-end-5', 'r-end-6'],
      cuts: [],
      chamfer: "V"
    },
    prop_P_forma:{
      forma: 3,
      heightAll: 1500,
      widthAll: 2000,
      heightRight: 1000, //Высота правой части(снаружи)
      widthRight: 600, //Ширина правой части П
      heightInsideRight: 600, //Высота правой(внутр) части П
      widthInside: 1000, //Ширина пространства внутри П
      heightLeft: 1100, //П расчетная высота левой
      widthLeft: 400, //П рысчетная ширина левой
      thickness: 40, //Толщина
      end: ['u-end-1', 'u-end-2', 'u-end-3', 'u-end-4', 'u-end-5', 'u-end-6', 'u-end-7', 'u-end-8'],
      cuts: [], //Отверстия
      chamfer: "V"
    },

    modelProperties: ()=>{return this.prop_Box_forma},
    chamfer: "V",
    forma: 1
  },
  reducers: {
    set_Prop_Box_forma: (state, action) => {
      state.prop_Box_forma = action.payload
    },
    set_Prop_G_forma: (state, action) => {
      state.prop_G_forma = action.payload
    },
    set_Prop_P_forma: (state, action) => {
      state.prop_P_forma = action.payload
    },
    setModelProperties: (state, action) => {
      state.modelProperties = action.payload
    },
    setChamferProperties: (state, action) => {
      state.chamfer = action.payload;
    },
    setFormaModel: (state, action) => {
      state.forma = action.payload;
    },
  },
});

export const { setModelProperties , setChamferProperties, setFormaModel,
  set_Prop_Box_forma, set_Prop_G_forma, set_Prop_P_forma } = modelActive.actions;

export default modelActive.reducer;
