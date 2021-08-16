<template>
  <div>
    <div class="content">
      <div>
        <b-sidebar
          id="sidebar-variant"
          title="Filters"
          bg-variant="dark"
          text-variant="light"
          shadow
        >
          <div class="px-3 py-2">
            <h5>End date</h5>
            <div class="flex-container">
              <label class="m-2" for="datepicker-from"
                >From:
                <b-form-datepicker
                  id="datepicker-from"
                  size="sm"
                  locale="en"
                  class="mb-2"
                  v-model="filter.from"
                  placeholder="Chose a date"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                ></b-form-datepicker
              ></label>

              <label class="m-2" for="datepicker-to"
                >To:<b-form-datepicker
                  id="datepicker-to"
                  size="sm"
                  locale="en"
                  class="mb-2"
                  v-model="filter.to"
                  placeholder="Chose a date"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                ></b-form-datepicker
              ></label>
            </div>
            <b-button variant="dark" class="m-2" @click="clearFilters">
              Clear filters
            </b-button>
          </div>
        </b-sidebar>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      filter: {
        from: null,
        to: null,
      },
    };
  },
  methods: {
    clearFilters() {
      this.$store.commit('clearFilter');
      this.filter = {
        from: null,
        to: null,
      };
    },
  },
  watch: {
    filter: {
      handler() {
        this.$store.commit('setFilter', {
          section: 'end_date',
          filter: this.filter,
        });
      },
      deep: true,
    },
  },
};
</script>
