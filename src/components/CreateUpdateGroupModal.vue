<template>
  <b-modal ref="create-group-modal" @hidden="resetModal" @ok="submitModal">
    <b-tabs v-if="mode === 'create'" v-model="active_tab" content-class="mt-3">
      <b-tab title="New Group" active>
        <form :state="isFormValid" ref="create-group-modal-form">
          <b-form-group label="Group name" label-for="group-name-input">
            <b-form-input
              id="group-name-input"
              type="text"
              v-model="group_name"
              :state="validationGroupName"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationGroupName">
              Group name must be 5-15 characters long.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationGroupName">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            label="Group image ( url )"
            label-for="group-image-input"
          >
            <b-form-input
              id="group-image-input"
              type="text"
              v-model="group_image"
              :state="validationGroupImage"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validationGroupImage">
              Please enter an image url
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationGroupImage">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
        </form>
      </b-tab>
      <b-tab title="Existing Group">
        <b-form-select v-model="selected_group">
          <b-form-select-option :value="null"
            >Please select group</b-form-select-option
          >
          <b-form-select-option
            v-for="group in groups"
            :key="group.id"
            :value="group.id"
            >{{ group.name }}</b-form-select-option
          >
        </b-form-select>
      </b-tab>
    </b-tabs>
    <div v-else>
      <form :state="isFormValid" ref="create-group-modal-form">
        <b-form-group label="Group name" label-for="group-name-input">
          <b-form-input
            id="group-name-input"
            type="text"
            v-model="group_name"
            :state="validationGroupName"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationGroupName">
            Group name must be 5-15 characters long.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validationGroupName">
            Looks Good.
          </b-form-valid-feedback>
        </b-form-group>
        <b-form-group label="Group image ( url )" label-for="group-image-input">
          <b-form-input
            id="group-image-input"
            type="text"
            v-model="group_image"
            :state="validationGroupImage"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validationGroupImage">
            Please enter an image url
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validationGroupImage">
            Looks Good.
          </b-form-valid-feedback>
        </b-form-group>
      </form>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          class="modal-footer-btn m-1"
          @click="submitModal"
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
    group: {
      type: Object,
    },
    mode: {
      type: String,
      default: 'create',
    },
  },
  data: () => {
    return {
      group_name: null,
      group_image: null,
      active_tab: 0,
      selected_group: null,
      is_save_disabled: false,
    };
  },
  methods: {
    async submitModal(bvModalEvt) {
      if (this.mode === 'create') {
        await this.save(bvModalEvt);
        return;
      }
      await this.update(bvModalEvt);
    },
    async save(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.isFormValid && this.active_tab === 0) {
        return;
      }
      this.is_save_disabled = true;

      this.showToastr(
        this.active_tab === 0
          ? await this.createNewGroup()
          : await this.addTasksToExistingGroup()
      );
      this.$emit('close');
      this.is_save_disabled = false;
    },
    async update(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (!this.isFormValid) {
        return;
      }
      this.is_save_disabled = true;
      this.showToastr(
        await this.$store.dispatch('updateGroup', {
          name: this.group_name,
          img: this.group_image,
          id: this.group.id,
        })
      );
      this.$emit('close');
      this.is_save_disabled = false;
    },
    async createNewGroup() {
      return await this.$store.dispatch('createGroup', {
        name: this.group_name,
        img: this.group_image,
      });
    },
    async addTasksToExistingGroup() {
      return await this.$store.dispatch(
        'addTasksToExistingGroup',
        this.selected_group
      );
    },
    resetModal() {
      this.group_name = null;
      this.group_image = null;
      this.$emit('close');
    },
    showToastr(status) {
      let map = {
        OK: { type: 'success', params: ['Group update successfully'] },
        Created: { type: 'success', params: ['Group created successfully'] },
        'Not Found': {
          type: 'success',
          params: ['Something went wrong', 'Oooopss..'],
        },
      };
      this.$toastr[map[status].type](...map[status].params);
    },
  },
  computed: {
    validationGroupName() {
      if (!this.group_name && typeof this.group_name !== 'string') {
        return null;
      }
      return this.group_name.length > 4 && this.group_name.length < 16;
    },
    validationGroupImage() {
      if (!this.group_image && typeof this.group_image !== 'string') {
        return null;
      }
      return true;
    },
    isFormValid() {
      return this.validationGroupName && this.validationGroupImage;
    },
    groups() {
      return this.$store.getters.groups;
    },
  },
  mounted() {
    this.$refs['create-group-modal'].show();
    if (this.group) {
      this.group_name = this.group.name;
      this.group_image = this.group.img;
    }
  },
};
</script>
