import axios from "axios";

const create = (quizId, payload) =>
  axios.post(`/quizzes/${quizId}/questions`, payload);

const questionApi = {
  create,
};

export default questionApi;
