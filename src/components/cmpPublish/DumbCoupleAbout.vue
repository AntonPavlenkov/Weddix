<template>
    <section class="couple-about">
        <div class="content" :style="cmp.style">
            <div class="about-1">
                <span class="about-1-name">{{cmp.data.aboutName1}}</span>
                <img :src="cmp.data.aboutImgUrl1" class="about-1-img" width="100px" height="200px">
                <span :style="cmp.style" class="about-1-info">{{cmp.data.aboutInfo1}}</span>
            </div>
            <div class="main-img-container">
                <img :src="cmp.data.mainImgUrl" class="main-img" width="100%">
            </div>
            <div class="about-2">
                <span class="about-2-name">{{cmp.data.aboutName2}}</span>
                <img :src="cmp.data.aboutImgUrl2" class="about-2-img" width="100px" height="200px">
                <span :style="cmp.style" class="about-2-info">{{cmp.data.aboutInfo2}}</span>
            </div>
     
        </div>
    </section>
</template>

<script>
export default {
    name: 'CoupleAbout',
    props: ['cmp'],
}
</script>


<style scoped>
.couple-about {
    transition: all .5s;
    transition: all .5s;
}

.content {
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    flex-flow: row nowrap;
}

.edit-btn {
    position: absolute;
    left: 85%;
    opacity: 0.2;
    transition: all .5s;
}
.input-newUrl{
    width: 80%;
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
    background: lightgray;
}

.about-1,
.about-2 {
    width: 30%;
    text-align: center;
    line-height: 100%;
}

.about-1-img:hover {
    opacity: .5;
    cursor: pointer;
}

.about-2-img:hover {
    opacity: .5;
    cursor: pointer;
}

.main-img:hover {
    opacity: .5;
    cursor: pointer;
}

.about-1-img,
.about-2-img {
    display: block;
    border-radius: 50%;
    margin: 0 auto;
}

.main-img-container {
    width: 40%;
}

.main-img {
    border-radius: 50%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to


{
    opacity: 0
}

.color-picker-btn {
    overflow: initial;
}
</style>
