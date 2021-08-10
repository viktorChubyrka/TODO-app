<template>
    <div class="paginator">
        <img 
            v-if="current_page > 0" 
            @click="$emit('prev' , current_page-1)" 
            src="/icons/arrow-left_icon.svg" 
            alt="prev"
        >
        <h2 
            v-for="el in +page_count" 
            :key="el"
            @click="$emit('select' , el - 1)" 
            :class="el === current_page + 1 ? 'selected' : ''" 
        >{{ el }}</h2>
        <img 
            v-if="current_page + 1 < page_count" 
            @click="$emit('next' , current_page + 1)" 
            src="/icons/arrow-right_icon.svg" 
            alt="next">
    </div>
</template>
<script>
export default {
    props: {
        current_page: {
            type: Number
        },
        page_count: {
            type: Number
        }
    }
}
</script>
