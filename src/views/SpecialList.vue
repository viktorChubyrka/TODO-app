<template>
  <div class="content">
    <div class="flex-container-wrap">
      <CardSpecialList :group="group" v-for="group in groups" :key="group.id" />
    </div>
  </div>
</template>
<script>
import CardSpecialList from '../components/CardSpecialList.vue';

export default {
  components: {
    CardSpecialList,
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
  },
};
</script>
