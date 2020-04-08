const state = {
  token: localStorage.getItem("token") || "",
  displayName: localStorage.getItem("displayName") || "",
  authResult: "",
  role: "",
  isAuthenticated: localStorage.getItem("token") ? true : false,
};
export default state;
