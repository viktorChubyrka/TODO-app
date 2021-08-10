<template>
    <div class="archive">
        <ArchiveItem :item="item" v-for="item in archiveTasks" :key="item.creation_date"/>
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
