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
                    <font-awesome-icon
                        class="table-action-icon"
                        :style="{ color: 'red' }" 
                        icon="trash-alt"
                        @click="deleteItem(task.item)"
                        size="lg"  
                    />
                    <font-awesome-icon
                        v-if="task.item.state === 'delited'"
                        class="table-action-icon"
                        :style="{ color: 'orange' }" 
                        icon="trash-restore"
                        @click="reactiveDeletedItem(task.item)"
                        size="lg"  
                    />
                </div>
                <div v-else>
                    <font-awesome-icon
                        class="table-action-icon"
                        :style="{ color: 'red' }" 
                        icon="archive"
                        @click="changeTaskState(task.item , 'delited')"
                        size="lg"  
                    />
                    <font-awesome-icon
                        class="table-action-icon"
                        :style="{ color: 'orange' }"
                        icon="edit"
                        @click="selected_task = task.item , show_modal = true"
                        size="lg"   
                    />
                    <font-awesome-icon
                        class="table-action-icon"
                        :style="{ color: 'green' }" 
                        icon="check-circle"
                        @click="changeTaskState(task.item , 'complited')"
                        size="lg" 
                    />
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
                return
            }
            this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
        async deleteItem(task) {
            let status = await this.$store.dispatch('deleteTaskById' , task.id);
            if(status === 'OK') {
                this.$toastr.success('The task has been permanently deleted');
                return
            }
            this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
        async reactiveDeletedItem(task) {
            task.state = 'active';
            let status = await this.$store.dispatch('updateTask' , task);
            if(status === 'OK') {
                this.$toastr.success('The task is now active');
                return
            }
            this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
    }
}
</script>

