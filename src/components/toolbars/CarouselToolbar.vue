<template>
    <section>
        <form novalidate @submit.stop.prevent="updateUrls" class="urls-form">
            <md-input-container v-for="(imgUrl, i) in cmpToEdit.data.imgUrls" :key="i">
                <label>{{'img -' + (i+1)}}</label>
                <md-input :value="imgUrl"></md-input>
            </md-input-container>
            <md-button class="md-raised md-primary" @click="addPic">Add Pic</md-button>
            <md-button class="md-raised md-primary" type="submit">submit</md-button>
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




