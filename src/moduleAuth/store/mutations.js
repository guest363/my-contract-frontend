const mutations = {
  async CREATE_USER(state, msg) {
    state.userToCreate = msg;
    const result = await backend.createUser(msg);
    state.isAuthenticated = result.data;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_DISPLAY_NAME(state, name) {
    state.displayName = name;
  },
  SET_AUTH_RESULT(state, result) {
    state.isAuthenticated = result;
  },
  SET_ROLE(state, result) {
    state.role = result;
  },
};
export default mutations;
