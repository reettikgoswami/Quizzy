import axios from "axios";

const isUrlValid = slug => axios.get(`/public/${slug}/attempts`);

const attemptApi = {
  isUrlValid,
};

export default attemptApi;
