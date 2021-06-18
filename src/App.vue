<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created(){
    this.$store.commit('setTasks')
  }
}
</script>
<style>

</style>
