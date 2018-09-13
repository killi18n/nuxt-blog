const state = () => ({
  ping: ""
});

const mutations = {
  PONG(state, payload) {
    state.ping = payload;
  }
};

const actions = {
  async PING({ commit }) {
    let pong = await this.$axios.$get("/ping");
    commit("PONG", pong);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
