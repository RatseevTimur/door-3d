import { createSlice } from "@reduxjs/toolkit";
import { TEXTURE_LOAD, TEXTURE_NULL } from "../types";

const initialState = {
  article: '',
  ax_item_id: '',
  chars: [],
  collection: {},
  name: '',
  prices: [],
  size: '',
  units: [],
  url: "",
  long: 0,
  width: 0,
}

const payload = {
  article: 'n142019',
  ax_item_id: 'n142019',
  chars: [],
  collection: {},
  name: 'Surface Laboratory/Бардилио серый лаппатированныйZZ|119.5x320',
  prices: [{price_mst: 6878},],
  size: '160x320',
  units: [],
  images: [{url: "/image/invents/kerama%20marazzi/surface%20laboratory/n142019.jpg"},],
  url: "",
  long: 0,
  width: 0,
}

export default function textureLoadReducer(state = initialState, action) {
  const { type, /*payload*/ } = action;

  switch (type) {
   
    case TEXTURE_LOAD:
      return {
        ...state,
        article: payload.article,
        ax_item_id: payload.ax_item_id,
        chars: payload.chars,
        collection: payload.collection,
        name: payload.name,
        prices: payload.prices,
        size: payload.size,
        units: payload.units,

        long: +payload.size.split('x')[1] * 10,
        width: +payload.size.split('x')[0] * 10,
        url: "/textures/wood-3.jpg",
      }
    case TEXTURE_NULL:
      return {
        ...state,

        article: '',
        ax_item_id: '',
        chars: [],
        collection: {},
        name: '',
        prices: [],
        size: '',
        units: [],
        url: "",
        long: 0,
        width: 0,
      }
    default:
      return state
  }

};
