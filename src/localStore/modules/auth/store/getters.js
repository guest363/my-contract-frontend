const getters = {
    GET_DISPLAY_NAME(state) {
        return state.displayName;
    },
    GET_TOKEN(state) {
        return storage ? storage : state.token;
    },
    GET_AUTH_RESULT(state) {
        return state.authResult;
    },
    GET_IS_AUTHENTICATED(state) {
        return state.isAuthenticated;
    }
};
export default getters;