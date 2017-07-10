<template>
    <section class="simple-title cmp-father" :style="cmp.style">
        <div class="content">
            <p class="main-title">{{cmp.data.mainTitle}}</p>
            <p :style="{fontSize: subTitleFontSize}" class="sub-title"> {{cmp.data.subTitle}} </p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'DumbSimpleTitle',
    props: ['cmp'],
    computed: {
        subTitleFontSize() {
            var currentFontSizeValue = this.cmp.style.fontSize;
            return +currentFontSizeValue.substring(0, currentFontSizeValue.indexOf("px")) * 0.6 + 'px';
        }
    }
}
</script>

<style scoped>
.simple-title {
    position: relative;
}

.content {
    margin: 30px 0;
}

p {
    margin: 0;
    padding: 0;
    line-height: 70px;
}
</style>
