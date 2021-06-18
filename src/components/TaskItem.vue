<template>
    <div v-if="mode==='readonly'" class="task-item">
        <img :src="`/icons/prioriti-${prioritiIcon}.svg`" alt="">
        <h3>{{task.text}}</h3>
        <div class="buttons-container">
            <img @click="changeTaskState('complited')" class="controll-button" src="/icons/tick_icon.svg" alt="sd">
            <img @click="updateTask()" class="controll-button" src="/icons/update_icon.svg" alt="sd">
            <img @click="changeTaskState('deleted')" class="controll-button" src="/icons/cross_icon.svg" alt="sd">
        </div>
    </div>
    <div v-else class="task-item">
        <img :src="`/icons/prioriti-${prioritiIcon}.svg`" alt="">
        <div class="input-container">
            <input v-model="task_for_update.priority" class="update-input" type="number" min="1" max="3">
            <input v-model="task_for_update.text" class="update-input" type="text">
        </div>
        <div class="buttons-container">
            <img @click="saveUpdatedTask()" class="controll-button" src="/icons/tick_icon.svg" alt="sd">
            <img @click="mode='readonly'" class="controll-button" src="/icons/cross_icon.svg" alt="sd">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        task:{
            type:Object
        },
    },
    data:()=>{
        return {
            mode:'readonly',
            task_for_update:null,
        }
    },
    computed:{
        prioritiIcon(){
            let priority = this.mode === 'readonly'?this.task.priority:this.task_for_update.priority
            switch (priority) {
                case "1":
                    return 'small'

                case "2":
                    return 'medium'

                case "3":
                    return 'big'

                default:
                    return ''

            }
        },
    },
    methods:{
        updateTask(){
            this.task_for_update = Object.assign({},this.task)
            this.mode = 'update'
        },
        saveUpdatedTask(){
            this.$store.commit('updateTask',this.task_for_update);
            this.$store.commit('saveTasks');
            this.mode = 'readonly';
        },
        changeTaskState(state){
            this.$store.commit('changeTaskState',{
                state,
                creation_date:this.task.creation_date
                }
            );
            this.$store.commit('saveTasks');
        },
        
    }
}
</script>
<style scoped>
.update-input:first-of-type{
    width:10% ;
}
.update-input{
    width:90%;
    font-size: 2.5vh;
    border-radius: 4vh;
    border:none;
    background-color: antiquewhite;
    padding: 2vh;
    margin-right: 2vh;
    text-transform: capitalize;
}
.update-input:last-child{
    margin-right: 0;
}
.update-input:focus{
    outline: none;
}
.input-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:calc(80% - 4vh);
}
</style>
