<template>
    <section class="simple-title">
        <div class="content" :style="cmp.style">
            <p class="main-title">{{cmp.data.mainTitle}}</p>
            <br>
            <p class="sub-title"> {{cmp.data.subTitle}} </p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'SimpleTitle',
    props: ['cmp'],
}
</script>


<style scoped>
.simple-title {
    transition: all .5s;
    position: relative;
    margin-top: 5px;
    transition: all .5s;
    margin: 0;
}

p {
    margin: 0;
    padding: 0;
    line-height: 50px;
}

.main-title {
    font-size: 70px;
}

.sub-title {
    font-size: 35px;
}

</style>
