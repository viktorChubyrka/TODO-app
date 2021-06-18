<template>
    <div class="archive">
    <ArchiveItem :item="item" v-for="item in paginatedData" :key="item.creation_date"/>
    <Paginator v-if="pageCount>1" @select="setPage" @next="setPage" @prev="setPage" :page_count="pageCount" :current_page="current_page"/>
    </div>
</template>
<script>
import ArchiveItem from "@/components/ArchiveItem.vue";
import Paginator from "@/components/Paginator.vue";


export default {
    components:{
        ArchiveItem,
        Paginator
    },
    data:()=>{
        return{
            current_page:0
        }
    },
    watch:{
        paginatedData(){
            if(this.paginatedData.length == 0 && this.archiveTasks.length>=6)this.current_page -=1;
        }
    },
    computed:{
        archiveTasks(){
            return this.$store.getters.archive_tasks;
        },
        paginatedData(){
            const start = this.current_page * 6,
            end = start + 6;
            return this.archiveTasks.slice(start, end);
           

        },
        pageCount(){
            let tasksLength = this.archiveTasks.length;
            if(tasksLength%6){
                return Math.floor(tasksLength/6)+1;
            }
            return Math.floor(tasksLength/6);
        },
    },
    methods:{
        setPage(page){
            if(page>=0 && page<this.pageCount)
            this.current_page = page;
        }
    }
}
</script>
<style scoped>
.archive{
    width:100%;
    max-height: 85vh;
}
</style>