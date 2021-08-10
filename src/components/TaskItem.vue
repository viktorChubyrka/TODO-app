<template>
    <div>
        <div class="task-item">
            <img :src="`/icons/prioriti-${prioritiIcon}.svg`" alt="">
            <h3>{{task.title}}</h3>
            <div class="buttons-container">
                <img @click="changeTaskState('complited')" class="controll-button" src="/icons/tick_icon.svg" alt="sd">
                <img @click="show_modal = true" class="controll-button" src="/icons/update_icon.svg" alt="sd">
                <img @click="changeTaskState('delited')" class="controll-button" src="/icons/cross_icon.svg" alt="sd">
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
        async changeTaskState(state) {
            this.task.state = state;
            let status = await this.$store.dispatch('updateTask' , this.task);
            if(status === 'OK') {
                this.$toastr.success(`Task was ${state} successfully, added to the archive`);
            } else this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
    }
}
</script>

