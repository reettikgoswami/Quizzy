import axios from "axios";

const isUrlValid = slug => axios.get(`/public/${slug}/attempts`);

const createUser = (slug, payload) =>
  axios.post(`/public/${slug}/attempts`, payload);

const getQuiz = slug => axios.get(`/public/${slug}/attempts/new`);

const attemptQuiz = (slug, id, payload) =>
  axios.put(`/public/${slug}/attempts/${id}`, payload);

const attemptApi = {
  isUrlValid,
  createUser,
  getQuiz,
  attemptQuiz,
};

export default attemptApi;
