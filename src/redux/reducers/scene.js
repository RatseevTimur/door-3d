import { createSlice } from "@reduxjs/toolkit";

export const sceneState = createSlice({
  name: "scene",
  initialState: {
    colorBackground: "414142",
    visible: true,
    visibleLeftPanel: false,
    visibleSink: false,
    sinkState: {
      forma: "",
      width: null,
      height: null
    }
  },
  reducers: {
    setColorBackground: (state, action) => {
      state.colorBackground = action.payload
    },
    setVisible: (state) => {
      state.visible = !state.visible
    },
    setVisibleLeftPanel: (state, action) => {
      state.visibleLeftPanel = action.payload
    },
    setVisibleSink: (state) => {
      state.visibleSink = !state.visibleSink
    },
    setSinkState: (state, action) => {
      state.sinkState.forma = action.payload.forma
      state.sinkState.width = action.payload.width
      state.sinkState.height = action.payload.height
    }
  }
});

export const { setColorBackground, setVisible, setVisibleLeftPanel, setVisibleSink, setSinkState } = sceneState.actions;

export default sceneState.reducer;
