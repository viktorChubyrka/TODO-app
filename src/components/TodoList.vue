<template>
    <div class="todo-list">
        <div class="action-panel">
            <b-button variant="dark" class="m-2" @click="show_modal = true" >Create task</b-button>
        </div>
        <div class="table-wrapper">
            <TaskTable :tasks="paginatedData" />
        </div>
        <Paginator
            v-if="pageCount > 1"
            @select="setPage"
            @next="setPage"
            @prev="setPage"
            :page_count="pageCount"
            :current_page="current_page"
        />
        <CreateUpdateTaskModal 
            v-if="show_modal"
            @close="show_modal = false"
        />
    </div>
</template>
<script>
import TaskTable from "@/components/TaskTable.vue"
import CreateUpdateTaskModal from "@/components/CreateUpdateTaskModal.vue"
import Paginator from "@/components/Paginator.vue"

export default {
    components: {
        TaskTable,
        CreateUpdateTaskModal,
        Paginator
    },
    data: () => {
        return {
            current_page: 0,
            show_modal: false
        }
    },
    computed: {
        activeTasks() {
            return this.$store.getters.active_tasks;
        },
        paginatedData() {
            const start = this.current_page * 10,
            end = start + 10;
            if(this.search) {
                return this.searchResult.slice(start , end);
            }
            return this.activeTasks.slice(start , end);
        },
        pageCount() {
            let tasksLength = null;
            if(this.search) tasksLength = this.searchResult.length;
            else tasksLength = this.activeTasks.length;
            if(tasksLength % 10) {
                return Math.floor(tasksLength / 10) + 1;
            }
            return Math.floor(tasksLength / 10); 
        }
    },
    methods: {
        setPage(page) {
            if(page >= 0 && page < this.pageCount)
            this.current_page = page;
        }
    }
}
</script>