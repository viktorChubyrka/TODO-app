<template>
    <div class="form-wrapper">
        <div @click="$emit('close')" class="form-back-ground"></div>
        <div class="form-container">
            <label>Пріоритет завдання(від 1 до 3):</label>
            <input v-model="priority" class="input" min="1" max="3" type="number">
            <label>Текст завдання</label>
            <input v-model="text" class="input" type="text">
            <button @click="createTask()"  class="button">Створити завдання</button>
        </div>
    </div>
</template>
<script>
export default {
    data:()=>{
        return{
            priority:"1",
            text:null
        }
    },
    methods:{
        createTask(){
            if(this.text){
                let task = {
                    priority : this.priority,
                    text : this.text,
                    creation_date: Date.now(),
                    state:'active'
                };
                this.$store.commit('createTask',task);
                this.$store.commit('saveTasks')
                this.$emit('close');
            }
        }
    },
    created(){
    //this.$store.commit('createTask',{ad:'sd'})
  }
}
</script>
<style scoped>
.form-back-ground{
    width:100vw;
    height:100vh;
    background-color: rgba(0, 0, 0, 0.733);
    backdrop-filter: blur(5px);
}
.form-container{
    position: absolute;
    padding: 2vh;
    border-radius: 2vh;
    background-color:honeydew;
    display: flex;
    flex-direction: column;
}
.input{
    width:30vw;
    font-size: 4vh;
    border-radius: 4vh;
    border:none;
    background-color: antiquewhite;
    padding: 2vh;
    margin-bottom: 2vh;
}
.input:focus{
    outline: none;
}
.form-wrapper{
    position: fixed;
    top:0;
    left:0;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100vw;
    height:100vh;
    z-index: 3;
}
.button{
    width:30vw;
    cursor: pointer;
    border-radius: 4vh;
    border:none;
    font-size: 4vh;
    font-weight: 600;
    color:brown;
    background-color: burlywood;
    padding: 2vh;
}
label{
    font-size: 3vh;
    margin-bottom: 1vh;
}
</style>