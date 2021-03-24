import axios from "axios";

const create = (quizId, payload) =>
  axios.post(`/quizzes/${quizId}/questions`, payload);

const destroy = (id, quiz_id) =>
  axios.delete(`/quizzes/${quiz_id}/questions/${id}`);

const questionApi = {
  create,
  destroy,
};

export default questionApi;
