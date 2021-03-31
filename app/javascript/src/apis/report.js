import axios from "axios";

const getReport = () => axios.get("/reports");

const reportApi = {
  getReport,
};

export default reportApi;
