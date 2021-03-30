import axios from "axios";

const isUrlValid = slug => axios.get(`/public/${slug}/attempts`);

const createUser = (slug, payload) =>
  axios.post(`/public/${slug}/attempts`, payload);

const attemptApi = {
  isUrlValid,
  createUser,
};

export default attemptApi;
