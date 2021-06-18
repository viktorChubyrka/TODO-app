<template>
    <div class="todo-list">
        <div class="action-panel">
            <div @click="is_creation_form_active=true" class="create-btn">
                <img class="add-icon" src="/icons/add_icon.svg" alt="">
                Створити завдання
            </div>
            <div>
                <div class="sorting-container">
                    <span>Сортувати за датою:</span>
                    <img @click="sortTasks('date_up')" class="arrow" src="/icons/arrow-up_icon.svg" alt="">
                    <img @click="sortTasks('date_down')" class="arrow" src="/icons/arrow-down_icon.svg" alt="">
                </div>
                <div class="sorting-container">
                    <span>Сортувати за приорітетом:</span>
                    <img @click="sortTasks('pririty_up')" class="arrow" src="/icons/arrow-up_icon.svg" alt="">
                    <img @click="sortTasks('pririty_down')" class="arrow" src="/icons/arrow-down_icon.svg" alt="">
                </div>
            </div>
            
        </div>
        <input placeholder="Пошук" v-model="search" type="text" class="search">
        <div v-if="!search">
            <TaskItem :task="task" v-for="task in activeTasks" :key="task.creation_date"/>
        </div>
        <div v-else>
            <TaskItem :task="task" v-for="task in searchResult" :key="task.creation_date"/>
        </div>
        
        <TaskCreationForm @close="is_creation_form_active=false" v-if="is_creation_form_active"/>
    </div>
</template>
<script>
import TaskItem from "@/components/TaskItem.vue"
import TaskCreationForm from "@/components/TaskCreationForm.vue"


export default {
    components:{
        TaskItem,
        TaskCreationForm
    },
    data:()=>{
        return {
            is_creation_form_active:false,
            search:''
        }
    },
    computed:{
        activeTasks(){
            return this.$store.getters.active_tasks;
        },
        searchResult(){
            if(this.activeTasks){
                let tasks = this.activeTasks.slice();
                return tasks.filter((item) => {
                    return (
                    item.text.toLowerCase().indexOf(this.search.toLowerCase()) != -1
                    );
                });
            }
            return []
            
        }

    },
    methods:{
        sortTasks(sort_method){
            this.$store.commit('sortTasks',sort_method)
        }
    }
}
</script>
<style scoped>
.todo-list{
    max-height: 85vh;
    width:100%
}
.add-icon{
    width:4vh;
    height: 4vh;
    margin-right: 1vh;
}
.create-btn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2vh;
    border-radius: 4vh;
    width:max-content;
    color:green;
    font-size: 3vh;
    transition: background-color 0.5s;
}
.create-btn:hover{
    background-color: antiquewhite;
    cursor: pointer;
}
.action-panel{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.sorting-container{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
img.arrow{
    cursor:pointer;
}
.search{
    width:100%;
    padding: 1vh;
    font-size: 2vh;
    border:none;
    border-radius:1vh;
    background: antiquewhite;

}
</style>