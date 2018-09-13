const state = () => ({
  post: null,
  posts: [],
  lastPage: null
});

const mutations = {
  postList(state, payload) {
    const { posts, lastPage } = payload;
    state.posts = posts;
    state.lastPage = lastPage;
  },
  readPost(state, payload) {
    state.post = payload;
  }
};

const getters = {
  post(state) {
    return state.post;
  }
};

const actions = {
  async postList({ commit }, { page, tag }) {
    try {
      let payload = await this.$axios.$get(`/api/post?page=${page}&tag=${tag}`);

      commit("postList", {
        posts: payload.posts,
        lastPage: payload.lastPage
      });
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
  async deletePost({ commit }, { postId }) {
    try {
      await this.$axios.$delete(`/api/post/${postId}`);
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
