<template>
    <div class="archive">
    <ArchiveItem :item="item" v-for="item in archiveTasks" :key="item.creation_date"/>
    </div>
</template>
<script>
import ArchiveItem from "@/components/ArchiveItem.vue";

export default {
    components:{
        ArchiveItem
    },
    computed:{
        archiveTasks(){
            return this.$store.getters.archive_tasks;
        },
       
    },
}
</script>
<style scoped>
.archive{
    width:100%;
    max-height: 85vh;
}
</style>