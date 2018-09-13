const state = () => ({
  modalStatus: {
    adminLogin: false,
    remove: false
  },
  inputs: {
    adminPassword: ""
  },
  logged: false,
  error: false,
  errorMessage: "",
  isEditor: false,
  isPost: false
});

const mutations = {
  showModal(state, payload) {
    state.modalStatus[payload] = true;
  },
  hideModal(state, payload) {
    state.modalStatus[payload] = false;
    state.inputs.adminId = "";
    state.inputs.adminPassword = "";
  },
  changeInput(state, payload) {
    const { name, value } = payload;
    state.inputs[name] = value;
  },
  setLogged(state, payload) {
    state.logged = payload;
  },
  tempLogin(state, payload) {
    state.logged = true;
  },
  setLoginError(state, payload) {
    state.error = true;
    state.errorMessage = payload.message;
  },
  setEditorPage(state, payload) {
    state.isEditor = payload;
  },
  setPostPage(state, payload) {
    state.isPost = payload;
  }
};

const actions = {
  async login({ commit }, { password }) {
    try {
      let { success } = await this.$axios.$post("/api/auth/login", {
        password
      });
      commit("setLogged", success);
      localStorage.setItem("logged", "true");
    } catch (e) {
      if (e.response.status === 401) {
        commit("setLoginError", { message: "일치하지 않는 비밀번호 입니다." });
      }
      localStorage.removeItem("logged");
      console.log(e);
    }
  },
  async check({ commit }) {
    try {
      let { logged } = await this.$axios.$get("/api/auth/check");
      commit("setLogged", logged);
    } catch (e) {
      localStorage.removeItem("logged");
      console.log(e);
    }
  },
  async logout({ commit }) {
    try {
      await this.$axios.$post("/api/auth/logout");
      commit("setLogged", false);
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
