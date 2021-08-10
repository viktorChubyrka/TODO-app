<template>
    <div class="todo-list">
        <div class="action-panel">
            <b-button variant="dark" class="m-2" @click="show_modal = true" >Create task</b-button>
            <!-- <div>
                <div class="sorting-container">
                    <span>Сортувати за датою:</span>
                    <img @click="sortTasks('date_up')" class="arrow" src="/icons/arrow-up_icon.svg" alt="">
                    <img @click="sortTasks('date_down')" class="arrow" src="/icons/arrow-down_icon.svg" alt="">
                </div>
                <div class="sorting-container">
                    <span>Сортувати за приорітетом:</span>
                    <img @click="sortTasks('pririty_up')" class="arrow" src="/icons/arrow-up_icon.svg" alt="">
                    <img @click="sortTasks('pririty_down')" class="arrow" src="/icons/arrow-down_icon.svg" alt="">
                </div>
            </div> -->
        </div>
        <div>
            <TaskItem 
                :task="task" 
                v-for="task in paginatedData" 
                :key="task.creation_date"
            />
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
import TaskItem from "@/components/TaskItem.vue"
import CreateUpdateTaskModal from "@/components/CreateUpdateTaskModal.vue"
import Paginator from "@/components/Paginator.vue"

export default {
    components: {
        TaskItem,
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
            return this.$store.getters.tasks;
        },
        paginatedData() {
            const start = this.current_page * 5,
            end = start + 5;
            if(this.search) {
                return this.searchResult.slice(start , end);
            }
            return this.activeTasks.slice(start , end);
        },
        pageCount() {
            let tasksLength = null;
            if(this.search) tasksLength = this.searchResult.length;
            else tasksLength = this.activeTasks.length;
            if(tasksLength % 5) {
                return Math.floor(tasksLength / 5) + 1;
            }
            return Math.floor(tasksLength / 5); 
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