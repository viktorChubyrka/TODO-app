<template>
  <div>
    <div class="card m-3" style="width: 18rem">
      <img class="card-img-top" :src="group.img" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{ group.name }}</h5>
        <p class="card-text">
          {{ group.id }}
        </p>
        <font-awesome-icon
          class="table-action-icon"
          :style="{ color: 'red' }"
          icon="trash-alt"
          @click.stop="deleteGroup"
          size="lg"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    group: {
      type: Object,
    },
  },
  methods: {
    async deleteGroup() {
      let status = await this.$store.dispatch('deleteGroupById', this.group);
      this.showToastr(status);
    },
    showToastr(status) {
      switch (status) {
        case 'OK':
          return this.$toastr.success('Group deleted successfully');
        default:
          return this.$toastr.error('Something went wrong', 'Oooopss..');
      }
    },
  },
};
</script>
