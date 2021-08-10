<template>
    <div :class="['task-item' , item.state]">
        <img :src="`/icons/prioriti-${prioritiIcon}.svg`" >
        <h3>{{ item.text }}</h3>
        <div class="buttons-container">
            <img 
                v-if="item.state==='deleted'" 
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
        item: {
            type: Object
        }
    },
    methods: {
        deleteItem() {
            this.$store.commit('deleteTask' , this.item);
            this.$store.commit('saveTasks');
        },
        reactiveDeletedItem() {
            this.$store.commit(
                'changeTaskState',
                {
                state: 'active',
                creation_date: this.item.creation_date
                }
            );
            this.$store.commit('saveTasks');
        },
    },
    computed: {
        prioritiIcon() {
            switch (this.item.priority) {
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
