import axios from 'axios';
import store from "../store";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

function request(request) {
    const axiosSource = axios.CancelToken.source();
    request.cancelToken = axiosSource.token;
    store.dispatch("addRequest", { ...request, cancel: axiosSource.cancel });
    return request;
}
  
function requestError() {
    store.commit("clearOldRequest");
}
  
function response(response) {
    store.commit("clearOldRequest");
    return response;
}
  
function responseError(error) {
    if (axios.isCancel(error)) console.log("Request is cancelled");
    else console.log("Unknown error");
}
  
axios.interceptors.request.use(request, requestError);
axios.interceptors.response.use(response, responseError);
  

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default {
  /**
   * Get all tasks 
   * 
   * @returns {Promise}
   */
    getTasks() {
        return axios.get(`/tasks`)
    },

  /**
   * Get task by his id
   * 
   * @returns {Promise}
   */
    getTaskById(id) {
        return axios.get(`/tasks/${id}`)
    },

  /**
   * Create a task 
   * 
   * @returns {Promise}
   */
    createTask(task) {
        return axios.post(`/tasks` , task)
    },

  /**
   * Update a task 
   * 
   * @returns {Promise}
   */
    updateTask(task) {
        return axios.put(`/tasks/${task.id}` , task)
    },

  /** Delete task by his id
   * 
   * @returns {Promise}
   */
    deleteTaskById(id) {
        return axios.delete(`/tasks/${id}`)
    },
};