<template>
    <div :class="['task-item' , task.state]">
        <img :src="`/icons/prioriti-${prioritiIcon}.svg`" >
        <h3>{{ task.title }}</h3>
        <div class="buttons-container">
            <img 
                v-if="task.state === 'delited'" 
                @click="reactiveDeletedItem()" 
                class="controll-button" 
                src="/icons/restore_icon.svg" 
            >
            <img 
                @click="deleteItem()" 
                class="controll-button" 
                src="/icons/cross_icon.svg" 
            >
        </div>
    </div>
</template>
<script>
export default {
    props: {
        task: {
            type: Object
        }
    },
    methods: {
        async deleteItem() {
            let status = await this.$store.dispatch('deleteTaskById' , this.task.id);
            if(status === 'OK') {
                this.$toastr.success('The task has been permanently deleted');
            }
            else this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
        async reactiveDeletedItem() {
            this.task.state = 'active';
            let status = await this.$store.dispatch('updateTask' , this.task);
            if(status === 'OK') {
                this.$toastr.success('The task is now active');
            }
            else this.$toastr.error('Somethink went wrong',"Oooopss..");
        },
    },
    computed: {
        prioritiIcon() {
            switch (this.task.priority) {
                case "1":
                    return 'small'
                case "2":
                    return 'medium'
                case "3":
                    return 'big'
                default:
                    return ''
            }
        }
    }
}
</script>
