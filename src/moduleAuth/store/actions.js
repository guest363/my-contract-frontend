import backend from "../backend/login.js";

const actions = {
  async LOGIN({ dispatch }, user) {
    /* 
    const result = await backend.login(user); 
    const authResult = result.data.name
        ? `Вы вошли под именем ${result.data.name}`
        : result.data;
    dispatch("AUTH_ACTION", {
        userJWT: result.data.userJWT,
        userName: result.data.name,
        role: result.data.role,
        authResult: authResult,
        isAuthenticated: true,
      });
    */
    let result = { data: {} };
    if (user.login === `admin` && user.password === "admin") {
      result = {
        data: {
          name: `Oleg`,
          userJWT: `3d2och32ici39`,
        },
      };
      const authResult = result.data.name
        ? `Вы вошли под именем ${result.data.name}`
        : result.data;
      dispatch("AUTH_ACTION", {
        userJWT: result.data.userJWT,
        userName: result.data.name,
        role: result.data.role,
        authResult: authResult,
        isAuthenticated: true,
      });
    }
  },
  AUTH_ACTION(
    { dispatch, commit, getters },
    { userJWT = "", userName = "", authResult, role = "user" }
  ) {
    commit("SET_TOKEN", userJWT);
    commit("SET_DISPLAY_NAME", userName);
    commit("SET_AUTH_RESULT", authResult);
    commit("SET_ROLE", role);
    commit(
      "SET_ALERT_MSG",
      { header: "Результат", text: getters.GET_AUTH_RESULT },
      { root: true }
    );
    commit("SHOW_ALERT", null, { root: true });
    localStorage.setItem("token", userJWT);
    localStorage.setItem("displayName", userName);
  },
  LOGOUT({ dispatch }) {
    dispatch("AUTH_ACTION", { authResult: "Вы разлонинены" });
  },
};
export default actions;
