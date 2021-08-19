<template>
  <b-modal ref="create-update-task-modal" @hidden="resetModal" @ok="saveTask">
    <form ref="create-update-task-modal-form">
      <b-form-group label="Priority" label-for="priority-input">
        <b-form-rating
          id="priority-input"
          v-model="priority"
          :color="priorityColor(priority - 1)"
          :stars="3"
        ></b-form-rating>
      </b-form-group>
      <b-form-group label="End Date" label-for="end_date_datepicker">
        <b-form-datepicker
          :state="validationEndDate"
          :min="dateNow"
          locale="en"
          id="end_date_datepicker"
          v-model="end_date"
          class="mb-2"
          required
        ></b-form-datepicker>
        <b-form-invalid-feedback :state="validationEndDate">
          Please enter valid date
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationEndDate">
          Looks Good.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group label="Title" label-for="title-input">
        <b-form-input
          id="title-input"
          type="text"
          v-model="title"
          :state="validationTitle"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="validationTitle">
          Task title must be 5-15 characters long.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationTitle">
          Looks Good.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group label="Description" label-for="description-input">
        <b-form-textarea
          id="description-input"
          v-model="description"
          placeholder="Enter description...(not required)"
          :state="validationDescription"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <b-form-invalid-feedback :state="validationDescription">
          Description can't be longer then 50 characters.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationDescription">
          Looks Good.
        </b-form-valid-feedback>
      </b-form-group>
    </form>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          class="modal-footer-btn m-1"
          @click="saveTask"
          :disabled="is_save_disabled"
        >
          <b-spinner small v-if="is_save_disabled"></b-spinner>
          <span v-else>Save</span>
        </b-button>
        <b-button class="modal-footer-btn m-1" @click="resetModal">
          Cancel
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
    },
  },
  data: () => {
    return {
      priority: null,
      title: null,
      description: null,
      priority_colors: ['green', 'orange', 'red'],
      is_save_disabled: false,
      end_date: null,
    };
  },
  methods: {
    async saveTask(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.isFormValid) {
        return;
      }
      this.is_save_disabled = true;
      let current_date = Date.now();
      let task = {
        priority: this.priority,
        title: this.title,
        description: this.description,
        created_at: this.task ? this.task.created_at : current_date,
        updated_at: current_date,
        end_date: this.end_date,
        state: 'active',
        id: this.task ? this.task.id : null,
      };
      let status = await this.$store.dispatch(
        this.task ? 'updateTask' : 'createTask',
        task
      );
      this.showToastr(status);
      this.$emit('close');
      this.is_save_disabled = false;
    },
    resetModal() {
      this.priority = '1';
      this.title = null;
      this.description = null;
      this.$emit('close');
    },
    showToastr(status) {
      switch (status) {
        case 'OK':
          return this.$toastr.success('Task update successfully');
        case 'Created':
          return this.$toastr.success('Task created successfully');
        default:
          return this.$toastr.error('Something went wrong', 'Oooopss..');
      }
    },
    priorityColor(priority) {
      if (priority > 2) {
        return 'red';
      }
      return this.priority_colors[priority];
    },
  },
  computed: {
    dateNow() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    },
    validationTitle() {
      if (!this.title && typeof this.title !== 'string') {
        return null;
      }
      return this.title.length > 4 && this.title.length < 15;
    },
    validationEndDate() {
      if (this.end_date === null) {
        return null;
      }
      return true;
    },
    validationDescription() {
      if (!this.description) {
        return null;
      }
      return this.description.length < 50;
    },
    isFormValid() {
      return (
        this.validationTitle && this.validationDescription && this.end_date
      );
    },
  },
  mounted() {
    this.$refs['create-update-task-modal'].show();
    if (this.task) {
      this.priority = this.task.priority > 3 ? 3 : this.task.priority;
      this.title = this.task.title;
      this.description = this.task.description;
      this.end_date = this.task.end_date;
    }
  },
};
</script>
