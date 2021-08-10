<template>
    <div class="archive">
        <ArchiveItem :task="task" v-for="task in archiveTasks" :key="task.creation_date"/>
    </div>
</template>
<script>
import ArchiveItem from "@/components/ArchiveItem.vue";

export default {
    components: {
        ArchiveItem
    },
    computed: {
        archiveTasks() {
            return this.$store.getters.archive_tasks;
        }
       
    }
}
</script>
