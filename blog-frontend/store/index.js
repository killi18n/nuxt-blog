import Vuex from "vuex";
import base from "./modules/base";
// import auth from "./modules/auth";
import editor from "./modules/editor";
import post from "./modules/post";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      base,
      //   auth,
      editor,
      post
    }
  });
};

export default createStore;
