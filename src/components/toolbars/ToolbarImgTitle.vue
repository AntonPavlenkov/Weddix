<template>
    <section>
        <md-input-container md-clearable class="input-newUrl">
            <label>Url of Img</label>
            <md-input v-model="newUrl"></md-input>
        </md-input-container>

        <md-button @click="saveNewUrl" class="md-fab md-mini md-clean">
            <md-icon>save</md-icon>
        </md-button>
    
        <md-menu md-align-trigger>
            <md-button md-menu-trigger class="md-fab md-clean  md-mini">
                <md-icon>image</md-icon>
                <md-tooltip md-direction="top">Change Image Shape</md-tooltip>
            </md-button>
            <md-menu-content>
                <md-menu-item @click="changeImageShape('star')">Star</md-menu-item>
                <md-menu-item @click="changeImageShape('hex')">Hexagon</md-menu-item>
                <md-menu-item @click="changeImageShape('heart')">Heart</md-menu-item>
            </md-menu-content>
        </md-menu>
    </section>
</template>
<script>
export default {
    name: 'ToolbarImgTitle',
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
        // updateUrl(url) {
        //     this.newUrl = this.cmpToEdit.data[url]
        //     this.selectedPicture = url
        // },
        saveNewUrl() {
            this.cmpToEdit.data.imgUrl = this.newUrl
            this.updateCmp(this.cmpToEdit)
        },
        changeImageShape(newShape) {
            this.cmpToEdit.shape = newShape;
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




