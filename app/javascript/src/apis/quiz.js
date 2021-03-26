import axios from "axios";

const list = () => axios.get("/quizzes");

const show = id => axios.get(`/quizzes/${id}`);

const create = payload => axios.post("/quizzes", payload);

const update = (id, payload) => axios.put(`/quizzes/${id}`, payload);

const destroy = id => axios.delete(`/quizzes/${id}`);

const publishQuiz = quizId => axios.post(`/quizzes/${quizId}/publishes`);

const quizApi = {
  list,
  create,
  show,
  destroy,
  update,
  publishQuiz,
};

export default quizApi;
