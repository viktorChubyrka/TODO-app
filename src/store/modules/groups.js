import api from '@/api/';

export default {
  state: {
    groups: [],
    group: null,
    selected_tasks: [],
  },
  getters: {
    groups: (state) => {
      return state.groups;
    },
    group: (state) => {
      return state.group;
    },
    selected_tasks: (state) => {
      return state.selected_tasks;
    },
  },
  mutations: {
    setGroups: (state, payload) => {
      state.groups = payload;
    },
    setGroup: (state, payload) => {
      state.group = payload;
    },
    addGroup: (state, payload) => {
      state.groups.push(payload);
    },
    updateGroup: (state, payload) => {
      state.groups = [
        ...state.groups.map((el) => {
          if (el.id !== payload.id) {
            return el;
          }
          el.name = payload.name;
          el.img = payload.img;
          return el;
        }),
      ];
    },
    deleteGroup: (state, payload) => {
      state.groups = [
        ...state.groups.filter((el) => {
          if (el.id !== payload) {
            return el;
          }
        }),
      ];
    },
    clearSelectedTasks: (state) => {
      state.selected_tasks = [];
    },
    setSelectedTasks: (state, payload) => {
      // Check if this element is in the array.
      // If so it returns the index of this element and otherwise -1.
      let elIndex = state.selected_tasks.findIndex((el) => {
        return el.id === payload.id;
      });
      // If the variable is -1 add the element to the array
      // and get out from the function
      if (elIndex === -1) {
        state.selected_tasks = [payload, ...state.selected_tasks];
        return;
      }
      // Else delete the item from array
      state.selected_tasks.splice(elIndex, 1);
    },
    addTasksToGroup: (state, payload) => {
      state.groups.map((el) => {
        if (el.id === payload.id) {
          el.tasks = [...el.tasks, ...payload.tasks];
        }
        return el;
      });
    },
  },
  actions: {
    getAllGroups: async (state) => {
      let res = await api.getGroups();
      if (res) {
        state.commit('setCancelTokenActive');
        for (let i = 0; i < res.data.length; i++) {
          let tasks = await api.getGroupTasks(res.data[i].id);
          res.data[i].tasks = tasks.data;
        }
        state.commit('setGroups', res.data);
        state.commit('setCancelTokenActive');
      }
    },
    addTasksToExistingGroup: async (state, payload) => {
      state.commit('setCancelTokenActive');
      let tasks = [];
      let group_task;
      let selected_tasks = state.getters.selected_tasks;
      for (let i = 0; i < selected_tasks.length; i++) {
        group_task = await api.createGroupTask(payload, {
          taskId: selected_tasks[i].id,
          groupId: payload,
        });
        tasks.push(group_task.data);
      }
      state.commit('setCancelTokenActive');
      state.commit('clearSelectedTasks');
      state.commit('addTasksToGroup', { id: payload, tasks });
      return group_task.statusText;
    },
    getGroupById: async (state, payload) => {
      let res = await api.getGroupById(payload);
      state.commit('setGroup', res.data);
    },
    createGroup: async (state, payload) => {
      // Try to create a group
      let res = await api.createGroup(payload);
      // Check if the group is created
      if (res?.status === 201) {
        // Off cancel token for several requests
        state.commit('setCancelTokenActive');
        res.data.tasks = [];
        let selected_tasks = state.getters.selected_tasks;
        // Go throuth the array end add selecterd tasks to created group
        for (let i = 0; i < selected_tasks.length; i++) {
          let group_task = await api.createGroupTask(res.data.id, {
            taskId: selected_tasks[i].id,
            groupId: res.data.id,
          });
          res.data.tasks.push(group_task.data);
        }
        // Activate cancel token
        state.commit('setCancelTokenActive');
        // Clear selected task
        state.commit('clearSelectedTasks');
        // Add group to the store
        state.commit('addGroup', res.data);
        return res.statusText;
      }
    },
    updateGroup: async (state, payload) => {
      payload.updated_at = Date.now();
      let res = await api.updateGroup(payload);
      if (res?.status === 200) {
        state.commit('updateGroup', res.data);
        return res.statusText;
      }
    },
    deleteGroupById: async (state, payload) => {
      for (let i = 0; i < payload.tasks.length; i++) {
        await state.dispatch('updateTask', {
          id: payload.tasks[i].taskId,
          state: 'complited',
        });
        await api.deleteGroupTaskById(payload.id, payload.tasks[i].id);
      }
      let res = await api.deleteGroupById(payload.id);
      if (res?.status === 200) {
        state.commit('deleteGroup', payload.id);
        return res.statusText;
      }
    },
  },
};
