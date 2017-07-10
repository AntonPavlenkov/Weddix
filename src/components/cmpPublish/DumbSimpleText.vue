<template>
    <section class="simple-text cmp-father" :style="cmp.style">
        <div class="content" >
            <p>{{cmp.data.txtLine1}}</p>
            <p>{{cmp.data.txtLine2}}</p>
            <p>{{cmp.data.txtLine3}}</p>
            <br>
        </div>
    </section>
</template>

<script>
export default {
    name: 'SimpleText',
    props: ['cmp']
}
</script>

<style scoped>
.simple-text {
    position: relative;
}

.content {
    margin: 0;
    padding: 0;
    line-height: 20px;
    padding: 10px;
}
</style>
