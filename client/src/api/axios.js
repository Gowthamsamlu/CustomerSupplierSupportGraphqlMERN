import axios from "axios";

const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN;

export default axios.create({
  baseURL: backendDomain,
});
