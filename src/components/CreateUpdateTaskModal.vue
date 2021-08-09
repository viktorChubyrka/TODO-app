<template>
    <b-modal
        ref="create-update-task-modal"
        @hidden="resetModal"
        @ok="saveTask"
    >
        <form ref="create-update-task-modal-form">
            <b-form-group label="Priority" label-for="priority-input">
                <b-form-rating
                    id="priority-input"
                    v-model="priority"
                    :color="priority_colors[priority-1]"
                    stars="3"
                ></b-form-rating>
            </b-form-group>
            <b-form-group label="Title" label-for="title-input">
                <b-form-input
                    id="title-input"
                    type="text"
                    v-model="title"
                    required
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Description" label-for="description-input">
                <b-form-textarea
                    id="description-input"
                    v-model="description"
                    placeholder="Enter description...(not required)"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-form-group>
        </form>
    </b-modal>
</template>
<script>
export default {
    props: {
        task: {
            type: Object
        }
    },
    data: () => {
        return{
            priority: 1,
            title: '',
            description: '',
            priority_colors: ['green' , 'orange' , 'red']
        }
    },
    methods: {
        saveTask(bvModalEvt) {
            bvModalEvt.preventDefault();
            if(!this.$refs['create-update-task-modal-form'].checkValidity()) {
                return
            }
            let current_date = Date.now();
            let task = {
                priority: this.priority,
                title: this.title,
                description: this.description,
                created_at: this.task ? this.task.created_at : current_date,
                updated_at: current_date,
                state: 'active'
            };
            this.$store.commit(this.task ? 'updateTask' : 'createTask' , task);
            this.$store.commit('saveTasks');
            this.$emit('close');
        },
        resetModal() {
            this.priority = '1';
            this.title = '';
            this.description = '';
            this.$emit('close');
        }
    },
    mounted() {
        this.$refs['create-update-task-modal'].show();
        if(this.task) {
            this.priority = this.task.priority;
            this.title = this.task.title;
            this.description = this.task.description;
        }
    }
}
</script>
