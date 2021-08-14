<template>
  <div class="task-table-container">
    <CreateUpdateTaskModal
      v-if="show_modal"
      @close="show_modal = false"
      :task="selected_task"
    />
    <b-table
      striped
      hover
      :fields="fields"
      :items="tasks"
      @row-clicked="selectItem"
      :tbody-tr-class="selectedRowClass"
      :per-page="8"
      :current-page="current_page"
    >
      <template #cell(created_at)="task">
        {{ formatDate(task.item.created_at) }}
      </template>
      <template #cell(updated_at)="task">
        {{ formatDate(task.item.updated_at) }}
      </template>
      <template #cell(actions)="task">
        <div v-if="mode === 'archive'">
          <font-awesome-icon
            class="table-action-icon"
            :style="{ color: 'red' }"
            icon="trash-alt"
            @click.stop="deleteItem(task.item)"
            size="lg"
          />
          <font-awesome-icon
            v-if="task.item.state === 'delited'"
            class="table-action-icon"
            :style="{ color: 'orange' }"
            icon="trash-restore"
            @click.stop="reactiveDeletedItem(task.item)"
            size="lg"
          />
        </div>
        <div v-else>
          <font-awesome-icon
            class="table-action-icon"
            :style="{ color: 'red' }"
            icon="archive"
            @click.stop="changeTaskState(task.item, 'delited')"
            size="lg"
          />
          <font-awesome-icon
            class="table-action-icon"
            :style="{ color: 'orange' }"
            icon="edit"
            @click.stop="(selected_task = task.item), (show_modal = true)"
            size="lg"
          />
          <font-awesome-icon
            class="table-action-icon"
            :style="{ color: 'green' }"
            icon="check-circle"
            @click.stop="changeTaskState(task.item, 'complited')"
            size="lg"
          />
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
import CreateUpdateTaskModal from '@/components/CreateUpdateTaskModal.vue';
import moment from 'moment';

export default {
  components: {
    CreateUpdateTaskModal,
  },
  props: {
    tasks: {
      type: Array,
      default: () => null,
    },
    mode: {
      type: String,
    },
    current_page: {
      type: Number,
    },
  },
  data: () => {
    return {
      selected_items: [],
      show_modal: false,
      selected_task: null,
      fields: [
        {
          key: 'id',
          sortable: true,
        },
        {
          key: 'priority',
          sortable: true,
        },
        {
          key: 'title',
        },
        {
          key: 'description',
        },
        {
          key: 'created_at',
          sortable: true,
        },
        {
          key: 'updated_at',
          sortable: true,
        },
        {
          key: 'actions',
        },
      ],
    };
  },
  computed: {
    areLoading() {
      if (this.tasks[1] === 'empty' || this.tasks.length) {
        return false;
      }
      return true;
    },
    prioritiIcon() {
      switch (this.task.priority) {
        case 1:
          return 'small';
        case 2:
          return 'medium';
        case 3:
          return 'big';
        default:
          return '';
      }
    },
    selectedTasks() {
      return this.$store.getters.selected_tasks;
    },
  },
  methods: {
    selectedRowClass(item) {
      let isInArray = this.selectedTasks.findIndex((el) => {
        return el.id === item.id;
      });
      if (isInArray !== -1) {
        return 'table-success';
      }
    },
    selectItem(item) {
      if (item.state !== 'delited' && item.state !== 'complited') {
        this.$store.commit('setSelectedTasks', item);
      }
    },
    formatDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    async changeTaskState(task, state) {
      task.state = state;
      let status = await this.$store.dispatch('updateTask', task);
      if (status === 'OK') {
        this.$toastr.info(
          `Task was ${state} successfully, added to the archive`
        );
        return;
      }
      this.$toastr.error('Somethink went wrong', 'Oooopss..');
    },
    async deleteItem(task) {
      let status = await this.$store.dispatch('deleteTaskById', task.id);
      if (status === 'OK') {
        this.$toastr.success('The task has been permanently deleted');
        return;
      }
      this.$toastr.error('Somethink went wrong', 'Oooopss..');
    },
    async reactiveDeletedItem(task) {
      task.state = 'active';
      let status = await this.$store.dispatch('updateTask', task);
      if (status === 'OK') {
        this.$toastr.success('The task is now active');
        return;
      }
      this.$toastr.error('Somethink went wrong', 'Oooopss..');
    },
  },
};
</script>
