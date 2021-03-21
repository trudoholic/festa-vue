import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  strict: debug,
  state: {
    mode: "modeNone",
  },
  getters: {
    getMode(state){
      return state.mode;
    },
  },
  mutations: {
    setModeState(state, value) {
      state.mode = value;
    },
  },
  actions: {
    setMode: ({ commit }, value) => {
      commit('setModeState', value);
    },
  },
  // modules: {}
});
