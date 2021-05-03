import axios from "axios";
const url = "http://127.0.0.1:5000";
export const request = {
  get: (endpoint, config) => {
    return axios.get(`${url}${endpoint}`, config && config);
  },
  post: (endpoint, data, config) => {
    return axios.post(`${url}${endpoint}`, data && data, config && config);
  },
  put: (endpoint, data, config) => {
    return axios.put(`${url}${endpoint}`, data && data, config && config);
  },
  patch: (endpoint, data, config) => {
    return axios.update(`${url}${endpoint}`, data && data, config && config);
  },
  delete: (endpoint, config) => {
    return axios.delete(`${url}${endpoint}`, config && config);
  },
};
