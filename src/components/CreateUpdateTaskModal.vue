<template>
  <b-modal ref="create-update-task-modal" @hidden="resetModal" @ok="saveTask">
    <form ref="create-update-task-modal-form">
      <b-form-group label="Priority" label-for="priority-input">
        <b-form-rating
          id="priority-input"
          v-model="$v.priority.$model"
          :color="priorityColor(priority - 1)"
          :stars="3"
          :state="!$v.priority.$dirty ? null : $v.priority.required"
        ></b-form-rating>
        <p class="danger" v-if="!$v.priority.required && $v.priority.$dirty">
          Priority is required
        </p>
      </b-form-group>
      <b-form-group label="End Date" label-for="end_date_datepicker">
        <b-form-datepicker
          :min="dateNow"
          locale="en"
          id="end_date_datepicker"
          v-model="$v.end_date.$model"
          class="mb-2"
          :state="!$v.end_date.$dirty ? null : $v.end_date.required"
          required
        ></b-form-datepicker>
        <p class="danger" v-if="!$v.end_date.required && $v.end_date.$dirty">
          Date is required
        </p>
      </b-form-group>
      <b-form-group label="Title" label-for="title-input">
        <b-form-input
          id="title-input"
          type="text"
          v-model.trim="$v.title.$model"
          :state="
            !$v.title.$dirty
              ? null
              : $v.title.required && $v.title.minLength && $v.title.maxLength
          "
          required
        ></b-form-input>
        <p class="danger" v-if="$v.title.$invalid && $v.title.$dirty">
          Task title must be 5-15 characters long.
        </p>
      </b-form-group>
      <b-form-group label="Description" label-for="description-input">
        <b-form-textarea
          id="description-input"
          v-model="$v.description.$model"
          placeholder="Enter description...(not required)"
          rows="3"
          max-rows="6"
          :state="
            !$v.description.$dirty
              ? null
              : $v.description.required && $v.description.maxLength
          "
        ></b-form-textarea>
        <p
          class="danger"
          v-if="
            (!$v.description.maxLength || !$v.description.required) &&
            $v.description.$dirty
          "
        >
          Description is required can't be longer then 50 characters.
        </p>
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
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  props: {
    task: {
      type: Object,
    },
  },
  data: () => {
    return {
      priority: null,
      end_date: null,
      title: null,
      description: null,
      priority_colors: ['green', 'orange', 'red'],
      is_save_disabled: false,
    };
  },
  validations: {
    priority: {
      required,
    },
    end_date: {
      required,
    },
    title: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(15),
    },
    description: {
      required,
      maxLength: maxLength(50),
    },
  },
  methods: {
    async saveTask(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.$touch();
      if (this.$v.$invalid) {
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
      this.end_date = null;
      this.$emit('close');
    },
    showToastr(status) {
      let map = {
        OK: { type: 'success', params: ['Task update successfully'] },
        Created: { type: 'success', params: ['Task created successfully'] },
        'Not Found': {
          type: 'success',
          params: ['Something went wrong', 'Oooopss..'],
        },
      };
      this.$toastr[map[status].type](...map[status].params);
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
