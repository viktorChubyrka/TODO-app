<template>
    <div class="archive">
        <div class="table-wrapper">
            <TaskTable :tasks="archiveTasks" mode="archive"/>
        </div>
    </div>
</template>
<script>
import TaskTable from "@/components/TaskTable.vue"

export default {
    components: {
        TaskTable
    },
    computed: {
        archiveTasks() {
            return this.$store.getters.archive_tasks;
        }
       
    }
}
</script>
