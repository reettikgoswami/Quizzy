import axios from "axios";

const getReport = () => axios.get("/reports");

const generateReport = () => axios.post("/reports");

const downloadReport = () =>
  axios.get("/reports/download", { responseType: "blob" });

const reportApi = {
  getReport,
  generateReport,
  downloadReport,
};

export default reportApi;
