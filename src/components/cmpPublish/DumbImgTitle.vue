<template>
    <section class="img-title cmp-father">
        <div class="content" :style="cmp.style">
            <span class="name1">{{cmp.data.name1}}</span>
            <div class="demo" :class="{[cmp.shape]: true}">
                <svg width="300" height="300">
                    <image :xlink:href="cmp.data.imgUrl" width="300" height="300" />
                </svg>
            </div>
            <span class="name2">{{cmp.data.name2}}</span>
            <svg class="defs">
                <defs>
                    <clipPath id="star-clip">
                        <polygon id="star" points="150,7.3 196.4,101.3 300,116.3 225,189.4 242.7,292.7 150,243.9 57.3,292.7 75,189.4 0,116.3 103.6,101.3" />
                    </clipPath>
                    <clipPath id="hex-clip">
                        <polygon id="hex" points="222.5,295 77.5,295 5,150 77.5,5 222.5,5 295,150" />
                    </clipPath>
                    <clipPath id="heart-clip">
                        <path id="heart" d="M248.078,5.883c-36.691-14.739-77.771-0.839-98.517,31.125C128.817,5.044,87.735-8.856,51.043,5.883 C9.354,22.632-10.863,70.009,5.887,111.696c16.06,39.98,143.314,139.607,143.314,139.607l0.359,0.28l0.36-0.28 c0,0,127.251-99.627,143.314-139.607C309.986,70.009,289.768,22.632,248.078,5.883z" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    </section>
</template>
<script>
export default {
    name: 'DumbImgTitle',
    props: ['cmp'],
    components: {
      
    },
    data() {
        return {
            isEditMode: false,
            shape: 'heart'
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
}
</script>

<style scoped lang="scss">
.img-title {
    position: relative;
    transition: all .5s;
}

.name1,
.name2 {
    padding: 20px 0;
}

.content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.defs {
    position: absolute;
    width: 0;
    height: 0;
}

.star image {
    clip-path: url(#star-clip);
}

.hex image {
    clip-path: url(#hex-clip);
}

.heart image {
    clip-path: url(#heart-clip);
}

@media (max-width: 650px) {
    .content {
        display: flex;
        flex-flow: row wrap;
    }
    .demo {
        order: 3;
        width: 100%;
        text-align: center;
    }
}
</style>




