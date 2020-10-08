import axios from "axios";

import { FETCH_MAP_STARTED, FETCH_MAP_SUCCESS, FETCH_MAP_FAILURE, GET_MAP } from "./actions";

const state = {
  mapData: [],
  loadingMap: false,
  error: {
    is: false,
    message: "",
  },
};

const getters = {
  map: (state) => state.mapData,
  loadingMap: (state) => state.loadingMap,
  hasError: (state) => state.error.is,
  errorMessage: (state) => state.error.message,
};

const actions = {
  async [GET_MAP]({ commit }) {
    commit(FETCH_MAP_STARTED);
    try {
      const { status, data } = await axios.get("/map");
      if (status === 200 && data) {
        commit(FETCH_MAP_SUCCESS, data);
      }
    } catch (err) {
      commit(FETCH_MAP_FAILURE, "mapFailure");
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
