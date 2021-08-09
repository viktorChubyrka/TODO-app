<template>
    <div>
        <div class="task-item">
            <img :src="`/icons/prioriti-${prioritiIcon}.svg`" alt="">
            <h3>{{task.title}}</h3>
            <div class="buttons-container">
                <img @click="changeTaskState('complited')" class="controll-button" src="/icons/tick_icon.svg" alt="sd">
                <img @click="show_modal = true" class="controll-button" src="/icons/update_icon.svg" alt="sd">
                <img @click="deleteTask" class="controll-button" src="/icons/cross_icon.svg" alt="sd">
            </div>
        </div>
        <CreateUpdateTaskModal 
            v-if="show_modal"  
            @close="show_modal = false" 
            :task="task"
        />
    </div>
</template>
<script>
import CreateUpdateTaskModal from "@/components/CreateUpdateTaskModal.vue"

export default {
    components: {
        CreateUpdateTaskModal
    },
    props: {
        task: {
            type: Object
        }
    },
    data: () => {
        return {
            show_modal: false,
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
        changeTaskState(state) {
            this.$store.commit(
                'changeTaskState',
                {
                state,
                created_at:this.task.created_at
                }
            );
            this.$store.commit('saveTasks');
        },
        deleteTask() {
            this.$store.dispatch('deleteTaskById' , this.task.id);
        }
    }
}
</script>

