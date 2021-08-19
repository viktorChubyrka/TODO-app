<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('getAllGroups').then(() => {
      this.$store.dispatch('getAllTasks');
    });
  },
};
</script>
