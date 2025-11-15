import axios from "axios";

const externalInstance = axios.create({
  withCredentials: false,
});

externalInstance.interceptors.response.use((response) => {
  // Thrown error for request with OK status code
  const { data } = response;
  return data;
});

export default externalInstance;
