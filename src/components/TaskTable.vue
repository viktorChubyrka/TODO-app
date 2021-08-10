<template>
    <div class="task-table-container">
        <CreateUpdateTaskModal 
            v-if="show_modal"  
            @close="show_modal = false" 
            :task="selected_task"
        />
        <b-table
            striped
            hover
            :fields="fields" 
            :items="tasks"
            table-variant="dark"
            :busy="!tasks.length"
        >
            <template #table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template #cell(actions)="task">
                <div v-if="mode === 'archive'">
                    <img 
                        class="table-action-icon"
                        @click="deleteItem(task.item)"
                        src="/icons/cross_icon.svg" 
                    >
                    <img
                        v-if="task.item.state === 'delited'"
                        class="table-action-icon" 
                        @click="reactiveDeletedItem(task.item)"
                        src="/icons/restore_icon.svg"
                    >
                    
                </div>
                <div v-else>
                    <img 
                        class="table-action-icon"
                        @click="changeTaskState(task.item , 'delited')"
                        src="/icons/cross_icon.svg" 
                    >
                    <img
                        class="table-action-icon" 
                        @click="selected_task = task.item , show_modal = true"
                        src="/icons/update_icon.svg"
                    >
                    <img
                    class="table-action-icon"
                    @click="changeTaskState(task.item , 'complited')" 
                    src="/icons/tick_icon.svg"
                    >
                </div>
            </template>
        </b-table>
    </div>
</template>
<script>
import CreateUpdateTaskModal from "@/components/CreateUpdateTaskModal.vue"

export default {
    components: {
        CreateUpdateTaskModal
    },
    props: {
        tasks: {
            type: Array
        },
        mode: {
            type: String
        }
    },
    data: () => {
        return {
            show_modal: false,
            selected_task:null,
            fields: [
                {
                  key: 'id',
                  sortable: true
                },
                {
                  key: 'priority',
                  sortable: true
                },
                {
                  key: 'title',
                },
                {
                  key: 'description',
                },
                {
                  key: 'created_at',
                  sortable: true
                },
                {
                  key: 'updated_at',
                  sortable: true
                },
                {
                    key: 'actions'
                }
            ]
        }
    },
    computed: {
        prioritiIcon() {
            switch (this.task.priority) {
                case 1:
                    return 'small'
                case 2:
                    return 'medium'
                case 3:
                    return 'big'
                default:
                    return ''
            }
        }
    },
    methods: {
        async changeTaskState(task,state) {
            task.state = state;
            let status = await this.$store.dispatch('updateTask' , task);
            if(status === 'OK') {
                this.$toastr.info(`Task was ${state} successfully, added to the archive`);
            } else this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
        async deleteItem(task) {
            let status = await this.$store.dispatch('deleteTaskById' , task.id);
            if(status === 'OK') {
                this.$toastr.success('The task has been permanently deleted');
            }
            else this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
        async reactiveDeletedItem(task) {
            task.state = 'active';
            let status = await this.$store.dispatch('updateTask' , task);
            if(status === 'OK') {
                this.$toastr.success('The task is now active');
            }
            else this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
    }
}
</script>

