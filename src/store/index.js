import Vue from 'vue';
import Vuex from 'vuex';
import groups from './modules/groups';
import tasks from './modules/tasks';

Vue.use(Vuex);

let isTaskInGroup = (groups, payload) => {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i]?.tasks?.some((task) => task.taskId === payload.id)) {
      return true;
    }
  }
  return false;
};

export default new Vuex.Store({
  state: {
    activeReq: null,
    cancel_token_active: true,
  },
  getters: {
    loading(state) {
      if (!state.activeReq) return false;
      return state.activeReq.msg === 'Loading';
    },
    cancel_token_active: (state) => {
      return state.cancel_token_active;
    },
    active_tasks: (state) => {
      return state.tasks.tasks.filter((el) => {
        let end_date = new Date(el.end_date).getTime();
        let from = new Date(state.tasks.filters.end_date.from).getTime();
        let to = new Date(state.tasks.filters.end_date.to).getTime();

        // Check for 'active' tasks
        if (el.state === 'complited' || el.state === 'delited') {
          return false;
        }
        // Check for match the filter
        if (from >= end_date || (to && to <= end_date)) {
          return false;
        }
        // Check for belonging to a group
        if (isTaskInGroup(state.groups.groups, el)) {
          return false;
        }
        // Check for match the search
        if (el.title.includes(state.tasks.search_input)) {
          return true;
        }
        return false;
      });
    },
  },
  mutations: {
    setCancelTokenActive: (state) => {
      state.cancel_token_active = !state.cancel_token_active;
    },
    addRequest: (state, req) => {
      state.activeReq = { url: req.url, cancel: req.cancel, msg: 'Loading' };
    },
    cancelReq: (state) => {
      state.activeReq.cancel();
      state.activeReq = null;
    },
    clearOldRequest: (state) => {
      state.activeReq = null;
    },
  },
  actions: {
    addRequest: ({ state, commit }, req) => {
      if (
        state.activeReq &&
        state.activeReq.url === req.url &&
        state.getters.cancel_token_active
      ) {
        commit('cancelReq');
      }
      commit('addRequest', req);
    },
  },
  modules: { tasks, groups },
});
