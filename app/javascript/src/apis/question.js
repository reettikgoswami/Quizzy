import axios from "axios";

const create = (quizId, payload) =>
  axios.post(`/quizzes/${quizId}/questions`, payload);

const destroy = (id, quizId) =>
  axios.delete(`/quizzes/${quizId}/questions/${id}`);

const show = (id, quizId) => axios.get(`/quizzes/${quizId}/questions/${id}`);

const update = (id, quizId, payload) =>
  axios.put(`/quizzes/${quizId}/questions/${id}`, payload);

const questionApi = {
  create,
  destroy,
  show,
  update,
};

export default questionApi;
