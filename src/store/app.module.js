/* eslint-disable no-unused-vars */
import axios from "axios";

import {
  FETCH_MAP_STARTED,
  FETCH_MAP_SUCCESS,
  FETCH_MAP_FAILURE,
  GET_MAP,
  GET_SLIDER_DATA,
  FETCH_SLIDER_DATA_STARTED,
  FETCH_SLIDER_DATA_SUCCESS,
  FETCH_SLIDER_DATA_FAILURE,
} from "./actions";

import map from "./mapData";
import sliderData from "./sliderData";

const state = {
  mapData: [],
  sliderData: [],
  loadingMap: false,
  loadingSliderData: false,
  error: {
    is: false,
    message: "",
  },
};

const getters = {
  mapData: (state) => state.mapData,
  loadingMap: (state) => state.loadingMap,
  sliderData: (state) => state.sliderData,
  loadingSliderData: (state) => state.loadingSliderData,
  hasError: (state) => state.error.is,
  errorMessage: (state) => state.error.message,
};

const actions = {
  async [GET_MAP]({ commit }) {
    commit(FETCH_MAP_STARTED);
    try {
      setTimeout(() => {
        commit(FETCH_MAP_SUCCESS, map);
      }, 2000);
    } catch (err) {
      commit(FETCH_MAP_FAILURE, "mapFailure");
    }
  },

  async [GET_SLIDER_DATA]({ commit }) {
    commit(FETCH_SLIDER_DATA_STARTED);
    try {
      setTimeout(() => {
        commit(FETCH_SLIDER_DATA_SUCCESS, sliderData);
      }, 2000);
    } catch (err) {
      commit(FETCH_SLIDER_DATA_FAILURE, "sliderDataFailure");
    }
  },
};

const mutations = {
  [FETCH_MAP_STARTED]: (state) => (state.loadingMap = true),
  [FETCH_MAP_SUCCESS]: (state, mapData) => {
    state.loadingMap = false;
    state.mapData = mapData;
  },
  [FETCH_MAP_FAILURE]: (state, message) => {
    state.loadingMap = false;
    state.error.is = true;
    state.error.message = message;
  },
  [FETCH_SLIDER_DATA_STARTED]: (state) => (state.loadingSliderData = true),
  [FETCH_SLIDER_DATA_SUCCESS]: (state, sliderData) => {
    state.loadingSliderData = false;
    state.sliderData = sliderData;
  },
  [FETCH_SLIDER_DATA_FAILURE]: (state, message) => {
    state.loadingSliderData = false;
    state.error.is = true;
    state.error.message = message;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
