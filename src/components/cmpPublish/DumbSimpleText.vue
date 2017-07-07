<template>
    <section class="simple-text">
        <div class="content" :style="cmp.style">
            <span>{{cmp.data.text1}}</span>
            <br>
            <span> Hello world </span>
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
    transition: all .5s;
    position: relative;
    /*width: 100%;*/
    margin-top: 5px;
    transition: all .5s;
}

.content {
    height: 100px;
}

p {
    margin: 0;
    padding: 0;
}

.edit-btn {
    position: absolute;
    left: 85%;
    opacity: 0.2;
    transition: all .5s;
}

.edit-btn:hover {
    opacity: 1;
    cursor: pointer;
}

.edit-console {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: space-between;
    /*top: 0;
    position: absolute;*/
    background: lightgray;
    /*width: 25%;
    z-index: 5;*/
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
    opacity: 0
}

.color-picker-btn {
    overflow: initial;
}
</style>
