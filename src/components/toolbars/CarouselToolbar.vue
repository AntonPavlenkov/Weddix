<template>
    <section>
        <form novalidate @submit.stop.prevent="updateUrls" class="urls-form">
            <md-input-container v-for="(imgUrl, i) in cmpToEdit.data.imgUrls" :key="i">
                <label>{{'img -' + (i+1)}}</label>
                <md-input :value="imgUrl"></md-input>
            </md-input-container>
            <md-button @click="addPic" class="md-fab md-mini md-clean">
                <md-icon>add</md-icon>
                <md-tooltip md-direction="top">Add Image</md-tooltip>
            </md-button>
            <md-button class="md-fab md-mini md-clean" type="submit">
                <md-icon>save</md-icon>
                <md-tooltip md-direction="top">Save</md-tooltip>
            </md-button>
        </form>
    </section>
</template>
<script>
export default {
    name: 'CarouselToolbar',
    props: ['cmp'],
    components: {
    },
    data() {
        return {
            newUrl: "",
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },

    methods: {
        updateCmp(updatedCmp) {
            this.$emit('update', updatedCmp);
        },
        updateUrls(ev) {
            var elInputs = ev.target.querySelectorAll('input')
            elInputs.forEach(function (input, idx) {
                this.cmpToEdit.data.imgUrls[idx] = input.value;
            }, this);
            this.updateCmp(this.cmpToEdit)
        },
        addPic() {
            this.cmpToEdit.data.imgUrls.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HZTy2RjjHZcdM7yTCEfkDvwT6-GzlpA7R74GnbXkaqgfyiB5');
            this.updateCmp(this.cmpToEdit)
        }
    }
}
</script>

<style scoped lang="scss">
.img-title {
    position: relative;
}

.content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.urls-form{
    text-align: center;
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
</style>




