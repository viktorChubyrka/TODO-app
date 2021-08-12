import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    task: null,
    selected_tasks: []
  },
  getters: {
    active_tasks: (state) => {
      return state.tasks.filter((el) => {
        if(el.state !== 'complited' && el.state !== 'delited') {
          return el;
        }
      })
    },
    selected_tasks: (state) => {
      return state.selected_tasks;
    },
    archive_tasks: (state) => {
      return state.tasks.filter((el) => {
        if(el.state !== 'active') {
          return el;
        }
      })
    },
    task: (state) => {
      return state.task;
    }
  },
  mutations: {
    setSelectedTasks: (state , payload) => {
      // Check if this element is in the array.
      // If so it returns the index of this element and otherwise -1.
      let elIndex = state.selected_tasks.findIndex((el) => {
        return el.id === payload.id;
      })
      // If the variable is -1 add the element to the array
      // and get out from the function
      if(elIndex === -1){
        state.selected_tasks = [payload , ...state.selected_tasks];
        return
      }
      // Else delete the item from array
      state.selected_tasks.splice(elIndex,1);
    },
    setTasks: (state , payload) => {
      state.tasks = payload;
    },
    setTask: (state , payload) => {
      state.task = payload;
    },
    addTask: (state , payload) => {
      state.tasks.push(payload);
    },
    updateTask: (state , payload) => {
      state.tasks = [...state.tasks.map((el) => {
        if(el.id !== payload.id) {
          return el;
        }
        return payload;
      })]
    },
    deleteTask: (state , payload) => {
      state.tasks = [...state.tasks.filter((el) => {
        if(el.id !== payload) {
          return el;
        } 
      })]
    }
  },
  actions: {
    getAllTasks: async (state) => {
      let res = await api.getTasks();
      state.commit('setTasks' , res.data);
    },
    getTaskById: async (state , payload) => {
      let res = await api.getTaskById(payload);
      state.commit('setTask' , res.data);
    },
    createTask: async (state , payload) => {
      let res = await api.createTask(payload);
      if(res.status === 201) {
        state.commit('addTask' , res.data);
        return res.statusText;
      }
    },
    updateTask: async (state , payload) => {
      payload.updated_at = Date.now();
      let res = await api.updateTask(payload);
      if(res.status === 200) {
        state.commit('updateTask' , res.data);
        return res.statusText;
      }
    },
    deleteTaskById: async (state , payload) => {
      let res = await api.deleteTaskById(payload);
      if(res.status === 200) {
        state.commit('deleteTask' , payload)
        return res.statusText;
      }
    }
  },
  modules: {}
});
