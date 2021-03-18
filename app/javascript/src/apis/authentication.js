import axios from "axios";

const login = payload => axios.post("/sessions", payload);

const logout = () => axios.delete("/sessions");

const currentUser = () => axios.get("/sessions");

const authenticationApi = {
  login,
  logout,
  currentUser,
};

export default authenticationApi;
