import axios from "axios";
export const request = {
  get: (endpoint, config) => {
    return axios.get(`http://127.0.0.1:5000${endpoint}`, config && config);
  },
  post: (endpoint, data, config) => {
    return axios.post(
      `http://127.0.0.1:5000${endpoint}`,
      data && data,
      config && config
    );
  },
  put: (endpoint, data, config) => {
    return axios.put(
      `http://127.0.0.1:5000${endpoint}`,
      data && data,
      config && config
    );
  },
  patch: (endpoint, data, config) => {
    return axios.update(
      `http://127.0.0.1:5000${endpoint}`,
      data && data,
      config && config
    );
  },
  delete: (endpoint, config) => {
    return axios.delete(`http://127.0.0.1:5000${endpoint}`, config && config);
  },
};
