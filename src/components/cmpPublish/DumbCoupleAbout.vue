<template>
    <section class="couple-about cmp-father" :style="cmp.style">
        <div class="content">
            <div class="about-1">
                <span class="about-1-name">{{cmp.data.aboutName1}}</span>
                <img :src="cmp.data.aboutImgUrl1" class="about-1-img" width="100px" height="200px">
                <span :style="cmp.style" class="about-1-info">{{cmp.data.aboutInfo1}}</span>
            </div>
            <div class="main-img-container">
                <img class="main-img" :src="cmp.data.mainImgUrl">
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

}

.content {
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    flex-flow: row nowrap;
}

.about-1,
.about-2 {
    width: 30%;
    text-align: center;
    line-height: 100%;
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

</style>
