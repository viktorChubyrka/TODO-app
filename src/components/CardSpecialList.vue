<template>
  <div>
    <div class="card m-3" style="width: 18rem">
      <img
        class="card-img-top"
        src="/images/task_logo.jpg"
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <p class="card-text">
          {{ task.description }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
    },
  },
};
</script>
