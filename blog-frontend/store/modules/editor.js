const state = () => ({
  title: "",
  markdown: "",
  tags: "",
  postId: ""
});

const getters = {
  markdown(state) {
    return state.markdown;
  }
};

const mutations = {
  initialize(state) {
    state.title = "";
    state.markdown = "";
    state.tags = "";
    state.postId = "";
  },
  changeInput(state, payload) {
    const { name, value } = payload;
    state[name] = value;
  },
  readPost(state, payload) {
    const { title, body, tags } = payload;
    state.title = title;
    state.markdown = body;
    state.tags = tags.join(",");
  },
  setPostId(state, payload) {
    state.postId = payload;
  }
};

const actions = {
  async writePost({ commit }, { title, body, tags }) {
    try {
      let payload = await this.$axios.$post("/api/post", {
        title,
        body,
        tags
      });
      commit("setPostId", payload._id);
    } catch (e) {
      console.log(e);
    }
  },
  async readPost({ commit }, { postId }) {
    try {
      let payload = await this.$axios.$get(`/api/post/${postId}`);
      commit("readPost", payload);
    } catch (e) {
      console.log(e);
    }
  },
  async editPost({ commit }, { postId, title, body, tags }) {
    try {
      let payload = await this.$axios.$patch(`/api/post/${postId}`, {
        title,
        body,
        tags
      });
      commit("setPostId", payload._id);
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
