import axios from "axios";

const isUrlValid = slug => axios.get(`/public/${slug}/attempts`);

const createUser = (slug, payload) =>
  axios.post(`/public/${slug}/attempts`, payload);

const getQuiz = slug => axios.get(`/public/${slug}/attempts/new`);

const attemptQuiz = (slug, id, payload) =>
  axios.put(`/public/${slug}/attempts/${id}`, payload);

const result = (slug, id) => axios.get(`/public/${slug}/attempts/${id}`);

const attemptApi = {
  isUrlValid,
  createUser,
  getQuiz,
  attemptQuiz,
  result,
};

export default attemptApi;
