<template>
  <div class="progres-bar">
    <h5>Group complition progress</h5>
    <b-progress class="mb-2" height="1rem" :max="max">
      <b-progress-bar
        :value="value"
        :label="`${((value / max) * 100).toFixed(2)}%`"
      ></b-progress-bar>
    </b-progress>
  </div>
</template>
<script>
export default {
  props: {
    max: {
      type: Number,
    },
    value: {
      type: Number,
    },
  },
};
</script>
