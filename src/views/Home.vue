<template>
  <div class="home">
    <Header @changeTab="changeMode"/>
    <div class="content">
      <TodoList v-if="mode==='task_list'"/>
      <Archive v-else/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import TodoList from "@/components/TodoList.vue"
import Archive from "@/components/Archive.vue"


export default {
  name: "Home",
  components: {
    Header,
    TodoList,
    Archive
  },
  data:()=>{
    return{
      mode:'task_list'
    }
  },
  methods:{
    changeMode(mode){
      this.mode = mode;
    }
  }
};
</script>

<style scoped>
  .home{
    width:100vw;
    height:100vh;
    padding:0 10vh 2vh;
    overflow: hidden;
  }
  .content{
    width:100%;
    height:89vh;
    background-color: honeydew;
    margin-top:8.9vh;
    padding: 2vh ;
  }
</style>
