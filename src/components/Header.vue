<template>
    <div class="header">
        <h1 @click="changeTab('task_list')" :class="{active:active_tab === 'task_list'}">Список задач</h1>
        <h1 @click="changeTab('archive')" :class="{active:active_tab === 'archive'}">Архів</h1>
    </div>
</template>
<script>


export default{
  data:()=>{
      return{
          active_tab:'task_list'
      }
  },
  methods:{
      changeTab(tab){
          this.active_tab = tab;
          this.$emit('changeTab',tab);
      }
  }
}
</script>

<style scoped>
.header{
    position: fixed;
    top:0;
    left:0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100vw;
    padding:4.1vh 10vh 0;
}
.header h1{
    padding:0 4vh 1vh;
    font-size:4vh;
    line-height: 100%;
    color:darkslategrey;
    cursor: pointer;
    border-radius: 1vh 1vh 0 0;
    transition: background-color .5s;
}
.header h1.active{
    background-color: honeydew;
}
</style>