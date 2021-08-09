import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    task: null
  },
  getters: {
    tasks: (state) => {
      return state.tasks;
    },
    task: (state) => {
      return state.task;
    }
  },
  mutations: {
    setTasks: (state , payload) => {
      state.tasks = payload;
    },
    setTask: (state , payload) => {
      state.task = payload;
    }
  },
  actions: {
    getAllTasks: async (state) => {
      let res = await api.getTasks();
      state.commit('setTasks' , res.data)
    },
    getTaskById: async (state , payload) => {
      let res = await api.getTaskById(payload);
      state.commit('setTask' , res.data)
    },
    createTask: async (state , payload) => {
      let res = await api.createTask(payload);
      if(res.status === 201) {
        state.dispatch('getAllTasks')
      }
    },
    updateTask: async (state , payload) => {
      let res = await api.updateTask(payload);
      if(res.status === 200) {
        state.dispatch('getAllTasks')
      }
    },
    deleteTaskById: async (state , payload) => {
      let res = await api.deleteTaskById(payload);
      if(res.status === 200) {
        state.dispatch('getAllTasks')
      }
    }
  },
  modules: {}
});
