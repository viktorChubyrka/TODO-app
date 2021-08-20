<template>
  <div>
    <div class="card m-3" style="width: 18rem">
      <div class="controll-icon-container">
        <font-awesome-icon
          class="group-card-controll-icon"
          :style="{ color: 'red' }"
          icon="times-circle"
          @click.stop="deleteGroup"
          size="lg"
        />
        <font-awesome-icon
          class="group-card-controll-icon"
          :style="{ color: 'orange' }"
          icon="edit"
          @click.stop="show_group_modal = true"
          size="lg"
        />
      </div>

      <div class="image-zoom">
        <img class="card-img-top" :src="group.img" alt="Card image cap" />
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ group.name }}</h5>
        <div
          v-tooltip.top-center="task.description"
          v-for="task in groupTasks"
          :key="task.id"
          class="group-task"
        >
          <div class="task-description">
            <span class="task-id">{{ task.id }}</span>
            {{ task.description }}
          </div>
        </div>
      </div>
    </div>
    <CreateUpdateGroupModal
      v-if="show_group_modal"
      :group="group"
      mode="update"
      @close="show_group_modal = false"
    />
  </div>
</template>
<script>
import CreateUpdateGroupModal from '@/components/CreateUpdateGroupModal.vue';
export default {
  components: {
    CreateUpdateGroupModal,
  },
  props: {
    group: {
      type: Object,
    },
  },
  data: () => {
    return {
      is_delete_btn_active: true,
      show_group_modal: false,
    };
  },
  methods: {
    async deleteGroup() {
      if (!this.is_delete_btn_active) {
        return;
      }
      this.is_delete_btn_active = false;
      let status = await this.$store.dispatch('deleteGroupById', this.group);
      this.showToastr(status);
      this.is_delete_btn_active = true;
    },
    showToastr(status) {
      let map = {
        OK: () => this.$toastr.success('Group deleted successfully'),
        'Not Found': () =>
          this.$toastr.error('Something went wrong', 'Oooopss..'),
      };
      map[status]();
    },
  },
  computed: {
    groupTasks() {
      return this.$store.getters.tasks.filter((task) => {
        if (this.group.tasks.some((el) => task.id === el.taskId)) {
          return true;
        }
        return false;
      });
    },
  },
};
</script>
