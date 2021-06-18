<template>
    <div class="paginator">
        <img v-if="current_page>0" @click="$emit('prev',current_page-1)" src="/icons/arrow-left_icon.svg" alt="">
        <h2 @click="$emit('select',el-1)" :class="el == current_page+1?'selected':''" v-for="el in +page_count" :key="el">{{el}}</h2>
        <img v-if="current_page+1<page_count" @click="$emit('next',current_page+1)" src="/icons/arrow-right_icon.svg" alt="">
    </div>
</template>
<script>
export default {
    props:{
        current_page:{
            type:Number
        },
        page_count:{
            type:Number
        }
    }
}
</script>
<style scoped>
.paginator{
    display: flex;
    align-items: center;
    justify-content: center;
}
h2{
    display: flex;
    align-items: center;
    justify-content: center;
    color:rgb(252, 202, 137);
    margin:0.5vh;
    width:5vh;
    height: 5vh;
    text-align: center;
    border-radius:50%;
    cursor: pointer;
}
.selected{
    background: rgb(252, 202, 137);
    color:honeydew;
}
img{
    cursor: pointer;
    width:5vh;
    height:5vh;
    margin:0.5vh
}
</style>