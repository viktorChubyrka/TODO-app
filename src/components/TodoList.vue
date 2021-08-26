<template>
  <div class="todo-list">
    <div class="action-panel">
      <b-button
        variant="dark"
        data-cy="create-task-btn"
        class="m-2"
        @click="show_modal = true"
      >
        Create task
      </b-button>
      <b-button variant="dark" class="m-2" v-b-toggle.sidebar-variant
        >Filters
      </b-button>
      <span v-if="areTaskSelected">
        <b-button
          @click="show_group_modal = true"
          variant="info"
          class="m-2 text-white"
          data-cy="create-group"
        >
          Add selected items to a group
        </b-button>
        <b-button variant="danger" @click="clearSelection" class="m-2">
          Clear selection
        </b-button>
      </span>
    </div>
    <div class="table-wrapper">
      <TaskTable :current_page="current_page + 1" :tasks="activeTasks" />
    </div>
    <Paginator
      v-show="pageCount > 1"
      @select="setPage"
      @next="setPage"
      @prev="setPage"
      :page_count="pageCount"
      :current_page="current_page"
    />
    <CreateUpdateTaskModal v-if="show_modal" @close="show_modal = false" />
    <CreateUpdateGroupModal
      v-if="show_group_modal"
      :task="activeTasks"
      @close="show_group_modal = false"
    />
  </div>
</template>
<script>
import TaskTable from '@/components/TaskTable.vue';
import CreateUpdateTaskModal from '@/components/CreateUpdateTaskModal.vue';
import CreateUpdateGroupModal from '@/components/CreateUpdateGroupModal.vue';
import Paginator from '@/components/Paginator.vue';

export default {
  components: {
    TaskTable,
    CreateUpdateTaskModal,
    CreateUpdateGroupModal,
    Paginator,
  },
  data: () => {
    return {
      current_page: 0,
      show_modal: false,
      show_group_modal: false,
    };
  },
  computed: {
    activeTasks() {
      return this.$store.getters.active_tasks;
    },
    pageCount() {
      let tasksLength = null;
      if (this.search) tasksLength = this.searchResult.length;
      else tasksLength = this.activeTasks.length;
      if (tasksLength % 8) {
        return Math.floor(tasksLength / 8) + 1;
      }
      return Math.floor(tasksLength / 8);
    },
    areTaskSelected() {
      return this.$store.getters.selected_tasks.length;
    },
  },
  methods: {
    setPage(page) {
      if (page >= 0 && page < this.pageCount) this.current_page = page;
    },
    clearSelection() {
      this.$store.commit('clearSelectedTasks');
    },
  },
};
</script>
