import api from '@/api/';

export default {
  state: {
    tasks: [],
    task: null,
    search_input: '',
    filters: {
      end_date: {
        from: null,
        to: null,
      },
    },
  },
  getters: {
    archive_tasks: (state) => {
      return state.tasks.filter((el) => {
        if (el.state !== 'active' && el.title.includes(state.search_input)) {
          return el;
        }
      });
    },
    task: (state) => {
      return state.task;
    },
    tasks: (state) => {
      return state.tasks;
    },
    search_input: (state) => {
      return state.search_input;
    },
  },
  mutations: {
    clearFilter: (state) => {
      state.filters = {
        end_date: {
          from: null,
          to: null,
        },
      };
    },
    setFilter: (state, payload) => {
      state.filters[payload.section] = payload.filter;
    },
    setSearchInput: (state, payload) => {
      state.search_input = payload;
    },
    setTasks: (state, payload) => {
      state.tasks = payload;
    },
    setTask: (state, payload) => {
      state.task = payload;
    },
    addTask: (state, payload) => {
      state.tasks.push(payload);
    },
    updateTask: (state, payload) => {
      state.tasks = [
        ...state.tasks.map((el) => {
          if (el.id !== payload.id) {
            return el;
          }
          return payload;
        }),
      ];
    },
    deleteTask: (state, payload) => {
      state.tasks = [
        ...state.tasks.filter((el) => {
          if (el.id !== payload) {
            return el;
          }
        }),
      ];
    },
  },
  actions: {
    getAllTasks: async (state) => {
      let res = await api.getTasks();
      state.commit('setTasks', res?.data);
    },
    getTaskById: async (state, payload) => {
      let res = await api.getTaskById(payload);
      state.commit('setTask', res.data);
    },
    createTask: async (state, payload) => {
      let res = await api.createTask(payload);
      if (res?.status === 201) {
        state.commit('addTask', res.data);
        return res;
      }
    },
    updateTask: async (state, payload) => {
      payload.updated_at = Date.now();
      let res = await api.updateTask(payload);
      if (res?.status === 200) {
        state.commit('updateTask', res.data);
        return res;
      }
    },
    deleteTaskById: async (state, payload) => {
      let res = await api.deleteTaskById(payload);
      if (res?.status === 200) {
        state.commit('deleteTask', payload);
        return res.statusText;
      }
    },
  },
};
