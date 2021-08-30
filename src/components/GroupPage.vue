<template>
  <div>
    <div v-if="group" class="group-page-image">
      <img class="image" :src="group.img" />
      <h3 class="group-page-name">{{ group.name }}</h3>

      <div class="controll-icon-container">
        <font-awesome-icon
          data-cy="delete-group-btn"
          class="group-card-controll-icon"
          :style="{ color: 'red' }"
          icon="times-circle"
          @click.stop="deleteGroup"
          size="lg"
        />
        <font-awesome-icon
          data-cy="update-group-btn"
          class="group-card-controll-icon"
          :style="{ color: 'orange' }"
          icon="edit"
          @click.stop="show_group_modal = true"
          size="lg"
        />
        <font-awesome-icon
          v-tooltip.top-center="
            'Click to open qrcode with this link and saved sorting'
          "
          class="group-card-controll-icon"
          :style="{ color: 'rgb(2, 2, 77)' }"
          icon="qrcode"
          size="lg"
          @click="show_qr_code = true"
        />
        <font-awesome-icon
          v-tooltip.top-center="'Click to create new task'"
          class="group-card-controll-icon"
          :style="{ color: 'green' }"
          icon="plus"
          size="lg"
          @click="show_task_create_modal = true"
        />
      </div>
    </div>
    <div class="tasks-container">
      <draggable v-model="tasks">
        <transition-group>
          <div
            class="'group-card-container',"
            v-for="task in tasks"
            :key="task.id"
          >
            <b-card
              :title="getTaskProperty('title', task.taskId)"
              :sub-title="task.taskId"
            >
              <div class="priority-indicator-container">
                <h5>Priority:</h5>
                <div
                  v-for="i in getTaskProperty('priority', task.taskId)"
                  :key="i"
                  :class="
                    priorityColor(getTaskProperty('priority', task.taskId))
                  "
                ></div>
              </div>
              <b-card-text>
                {{ getTaskProperty('description', task.taskId) }}
              </b-card-text>
              <b-card-text>{{
                getTaskProperty('end_date', task.taskId)
              }}</b-card-text>
            </b-card>
          </div>
        </transition-group>
      </draggable>
    </div>
    <CreateUpdateGroupModal
      v-if="show_group_modal"
      :group="group"
      mode="update"
      @close="show_group_modal = false"
      @OK="addTaskToGroup"
    />
    <CreateUpdateTaskModal
      v-if="show_task_create_modal"
      @close="show_task_create_modal = false"
      @OK="addTaskToGroup"
    />
    <div v-if="show_qr_code" class="pop-up">
      <vue-qr
        class="qr-code"
        :text="`http://localhost:8080${this.$route.fullPath}`"
      ></vue-qr>
      <font-awesome-icon
        class="pop-up-close"
        :style="{ color: 'red' }"
        icon="times"
        @click.stop="show_qr_code = false"
        size="lg"
      />
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import CreateUpdateGroupModal from '@/components/CreateUpdateGroupModal.vue';
import CreateUpdateTaskModal from '@/components/CreateUpdateTaskModal.vue';
import VueQr from 'vue-qr';

export default {
  components: {
    draggable,
    CreateUpdateGroupModal,
    CreateUpdateTaskModal,
    VueQr,
  },
  data: () => {
    return {
      show_group_modal: false,
      show_qr_code: false,
      show_task_create_modal: false,
      tasks: [],
    };
  },
  watch: {
    group(val) {
      this.tasks = this.$route.query.tasks.map((taskId) => {
        return val.tasks.find((el) => el.taskId == taskId);
      });
    },
    tasks(cur, prev) {
      if (prev) {
        this.$router
          .replace({
            path: '/special_list_group',
            query: { id: this.group.id, tasks: cur.map((el) => el.taskId) },
          })
          .catch(() => {});
      }
    },
  },
  methods: {
    async addTaskToGroup(taskId) {
      let new_task = await this.$store.dispatch('addTaskToGroup', {
        id: this.group.id,
        taskId,
      });
      this.tasks.push(new_task);
      this.show_task_create_modal = false;
    },
    priorityColor(priority) {
      let colorClasses = {
        1: 'green_task',
        2: 'yellow_task',
        3: 'red_task',
      };
      return colorClasses[priority];
    },
    getTaskProperty(property, id) {
      if (this.$store.getters.tasks.length)
        return this.$store.getters.tasks.find((el) => el.id === id)[property];
    },
    async deleteGroup() {
      if (!this.is_delete_btn_active) {
        return;
      }
      this.is_delete_btn_active = false;
      let status = await this.$store.dispatch('deleteGroupById', this.group);
      this.showToastr(status);
      this.$router.push('/special_list');
    },
    showToastr(status) {
      let map = {
        OK: { type: 'info', params: ['Group deleted successfully'] },
        'Task Done': { type: 'success', params: ['Task is now done!'] },
        'Task Already Done': {
          type: 'info',
          params: ['Task is already done!'],
        },
        'Not Found': {
          type: 'success',
          params: ['Something went wrong', 'Oooopss..'],
        },
      };
      this.$toastr[map[status].type](...map[status].params);
    },
  },
  computed: {
    group() {
      return this.$store.getters.groups.find(
        (el) => el.id === this.$route.query.id
      );
    },
  },
  created() {
    if (this.group)
      this.tasks = this.$route.query.tasks.map((taskId) => {
        return this.group.tasks.find((el) => el.taskId == taskId);
      });
  },
};
</script>
