import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classic: 0,
    bonus: 0,
    currentGame: 'classic',
  },
  mutations: {
    updateScore(state, { type, score }) {
      if (type === 'classic') {
        state.classic = score.classic;
      } else if (type === 'bonus') {
        state.bonus = score.bonus;
      } else {
        state.classic = score.classic;
        state.bonus = score.bonus;
      }
    },
    updateCurrentGame(state, payload) {
      state.currentGame = payload;
    },
  },
  actions: {},
  modules: {},
});
