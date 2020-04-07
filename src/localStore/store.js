import Vue from "vue";
import Vuex from "vuex";

import persone from "../moduleUserPanel/store/index.js";
import alert from "./modules/alert";
import auth from "./modules/auth/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    portalName: "Согласование договоров",
  },
  mutations: {
    add(state, data) {
      state.message.push(data);
    },

    addWikiTag(state, data) {
      state.wikiTag.push(data);
    },
  },
  getters: {
    getPortalName(state) {
      return state.portalName;
    },
  },
  modules: {
    persone,
    alert,
    auth,
  },
});

export default store;
