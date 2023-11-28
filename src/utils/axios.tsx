import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_ENDPOINT}/api`,
  timeout: 5000,
});
export default instance;
