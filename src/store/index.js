import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks:[]
  },
  getters:{
    active_tasks:(state)=>{
      return state.tasks.filter(el=> el.state === 'active')
    },
    archive_tasks:(state)=>{
      return state.tasks.filter(el=> el.state != 'active')
    },
   
  },
  mutations: {
    setTasks:(state)=>{
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      if(tasks){
        state.tasks=tasks;
      }
    },
    createTask:(state,payload)=>{
      state.tasks.push(payload);
      localStorage.setItem('tasks',JSON.stringify(state.tasks))
    },
    updateTask:(state,payload)=>{
      let updated_tasks = state.tasks.map(el=>{
        if(el.creation_date == payload.creation_date){
          el=payload;
        }
        return el
      })
      state.tasks = updated_tasks;
    },
    saveTasks:(state)=>{
      localStorage.setItem('tasks',JSON.stringify(state.tasks));
    },
    changeTaskState(state,payload){
      let updated_tasks = state.tasks.map(el=>{
        if(el.creation_date == payload.creation_date){
          el.state=payload.state;
        }
        return el
      })
      state.tasks = updated_tasks;
    },
    deleteTask:(state,payload)=>{
      let index_of_item_to_delete = state.tasks.indexOf(payload);
      state.tasks.splice(index_of_item_to_delete,1)
    },
    sortTasks:(state,payload)=>{
      console.log(payload);
      switch (payload) {
        case 'pririty_up':
            state.tasks.sort((a,b)=>{
                if (a.priority>b.priority) return -1;
                else if(a.priority<b.priority) return 1;
                else return 0
            });
            break;
        case 'pririty_down':
            state.tasks.sort((a,b)=>{
                if (a.priority<b.priority) return -1;
                else if(a.priority<b.priority) return 1;
                else return 0
            });
            break;
        case 'date_up':
            state.tasks.sort((a,b)=>{
                if (a.creation_date>b.creation_date) return -1;
                else if(a.creation_date<b.creation_date) return 1;
                else return 0
            });
            break;
        case 'date_down':
            state.tasks.sort((a,b)=>{
                if (a.creation_date<b.creation_date) return -1;
                else if(a.creation_date>b.creation_date) return 1;
                else return 0
            });
            break;
    
        default:
            break;
    }
    },
  },
  actions: {
  },
  modules: {},
});
