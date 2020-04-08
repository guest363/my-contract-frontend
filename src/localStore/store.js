import Vue from "vue";
import Vuex from "vuex";

/* import persone from "../moduleUserPanel/store/index.js"; */
import alert from "./modules/alert";
import auth from "../moduleAuth/store/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    portalName: "Согласование договоров",
  },
  mutations: {
    add(state, data) {
      state.message.push(data);
    },
  },
  getters: {
    getPortalName(state) {
      return state.portalName;
    },
  },
  modules: {
    alert,
    auth,
  },
});

export default store;
