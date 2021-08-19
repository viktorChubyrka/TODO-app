import axios from 'axios';
import store from '../store';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

function request(request) {
  const axiosSource = axios.CancelToken.source();
  request.cancelToken = axiosSource.token;
  store.dispatch('addRequest', { ...request, cancel: axiosSource.cancel });
  return request;
}

function requestError(error) {
  store.commit('clearOldRequest');
  return error;
}

function response(response) {
  store.commit('clearOldRequest');
  return response;
}

function responseError(error) {
  if (axios.isCancel(error)) console.log('Request is cancelled');
  else error;
}

axios.interceptors.request.use(request, requestError);
axios.interceptors.response.use(response, responseError);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default {
  /**
   * Get all tasks
   *
   * @returns {Promise}
   */
  getTasks() {
    return axios.get(`/tasks`);
  },

  /**
   * Get task by his id
   *
   * @returns {Promise}
   */
  getTaskById(id) {
    return axios.get(`/tasks/${id}`);
  },

  /**
   * Create a task
   *
   * @returns {Promise}
   */
  createTask(task) {
    return axios.post(`/tasks`, task);
  },

  /**
   * Update a task
   *
   * @returns {Promise}
   */
  updateTask(task) {
    return axios.put(`/tasks/${task.id}`, task);
  },

  /** Delete task by his id
   *
   * @returns {Promise}
   */
  deleteTaskById(id) {
    return axios.delete(`/tasks/${id}`);
  },
  /**
   * Get all groups
   *
   * @returns {Promise}
   */
  getGroups() {
    return axios.get(`/groups`);
  },

  /**
   * Get group by his id
   *
   * @returns {Promise}
   */
  getGroupById(id) {
    return axios.get(`/groups/${id}`);
  },

  /**
   * Create a group
   *
   * @returns {Promise}
   */
  createGroup(group) {
    return axios.post(`/groups`, group);
  },

  /**
   * Update a group
   *
   * @returns {Promise}
   */
  updateGroup(group) {
    return axios.put(`/groups/${group.id}`, group);
  },

  /** Delete group by his id
   *
   * @returns {Promise}
   */
  deleteGroupById(id) {
    return axios.delete(`/groups/${id}`);
  },
  /**
   * Get all group tasks
   *
   * @returns {Promise}
   */
  getGroupTasks(group_id) {
    return axios.get(`/groups/${group_id}/assign`);
  },

  /**
   * Get group task by his id
   *
   * @returns {Promise}
   */
  getGroupTaskById(group_id, task_id) {
    return axios.get(`/groups/${group_id}/assign/${task_id}`);
  },

  /**
   * Create a group task
   *
   * @returns {Promise}
   */
  createGroupTask(group_id, task) {
    return axios.post(`/groups/${group_id}/assign`, task);
  },

  /**
   * Update a group task
   *
   * @returns {Promise}
   */
  updateGroupTask(group_id, task) {
    return axios.put(`/groups/${group_id}/assign/${task.id}`, task);
  },

  /** Delete group task by his id
   *
   * @returns {Promise}
   */
  deleteGroupTaskById(group_id, task_id) {
    return axios.delete(`/groups/${group_id}/assign/${task_id}`);
  },
};
