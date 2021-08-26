<template>
  <div class="archive">
    <div class="table-wrapper">
      <TaskTable
        :current_page="current_page + 1"
        :tasks="archiveTasks"
        mode="archive"
      />
    </div>
    <Paginator
      v-if="pageCount > 1"
      @select="setPage"
      @next="setPage"
      @prev="setPage"
      :page_count="pageCount"
      :current_page="current_page"
    />
  </div>
</template>
<script>
import TaskTable from '@/components/TaskTable.vue';
import Paginator from '@/components/Paginator.vue';

export default {
  data: () => {
    return {
      current_page: 0,
    };
  },
  components: {
    TaskTable,
    Paginator,
  },
  methods: {
    setPage(page) {
      if (page >= 0 && page < this.pageCount) this.current_page = page;
    },
  },
  computed: {
    archiveTasks() {
      return this.$store.getters.archive_tasks;
    },
    pageCount() {
      let tasksLength = null;
      if (this.search) tasksLength = this.searchResult.length;
      else tasksLength = this.archiveTasks.length;
      if (tasksLength % 8) {
        return Math.floor(tasksLength / 8) + 1;
      }
      return Math.floor(tasksLength / 8);
    },
  },
};
</script>
