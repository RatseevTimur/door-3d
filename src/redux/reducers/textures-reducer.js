import { createSlice } from "@reduxjs/toolkit";



export const textureActive = createSlice({
  name: "textureSelected",
  initialState: {
    id: 1, 
    name:  'дерево 1',
    url:  `${process.env.PUBLIC_URL}/textures/wood-1.jpg`,
  },
  reducers: {
    setTextureSelected: (state, action) => {
        return {...state,
            id: action.payload.id, 
            name: action.payload.name,
            url: action.payload.url,
        }
    },
  },
});

export const { setTextureSelected } = textureActive.actions;

export default textureActive.reducer;
