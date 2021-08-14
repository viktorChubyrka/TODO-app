<template>
  <div class="content">
    <div class="flex-container-wrap">
      <CardSpecialList
        :task="task"
        v-for="task in selectedTasks"
        :key="task.id"
      />
    </div>
  </div>
</template>
<script>
import CardSpecialList from '../components/CardSpecialList.vue';

export default {
  components: {
    CardSpecialList,
  },
  computed: {
    selectedTasks() {
      return this.$store.getters.selected_tasks;
    },
  },
};
</script>
