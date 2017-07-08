<template>
    <section>
        <div class="content" :style="cmp.style">
            <span contenteditable @blur="updateText('name1')">{{cmp.data.name1}}</span>
            <div class="demo" :class="{[cmp.shape]: true}">
                <svg width="300" height="300">
                    <image :xlink:href="cmp.data.imgUrl" width="300" height="300" />
                </svg>
            </div>
            <span contenteditable @blur="updateText('name2')">{{cmp.data.name2}}</span>
            <md-button class="md-fab edit-btn md-mini md-warn" @click="enterEditMode">
                <md-icon>edit</md-icon>
            </md-button>
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
    
        <transition name="fade">
            <div v-if="isEditMode" class="edit-console" v-draggable>
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
                        <md-tooltip md-direction="top">Change Main Image Shape</md-tooltip>
                    </md-button>
                    <md-menu-content>
                        <md-menu-item @click="changeImageShape('star')">Star</md-menu-item>
                    </md-menu-content>
                </md-menu>
    
                <txt-toolbar :cmp="cmp" @update="updateCmp"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </div>
        </transition>
    
    </section>
</template>
<script>
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'
export default {
    name: 'ImgTitle',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit
    },
    data() {
        return {
            isEditMode: false,
            newUrl: "",
            color: "",
            shape: 'heart'
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },

    methods: {
        updateCmp(updatedCmp, dragModeNew) {
            // console.log(dragModeNew)
            // this.modifyDragMode(dragModeNew)
            this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
        },

        updateText(text) {
            this.cmpToEdit.data[text] = event.target.innerText
            this.updateCmp(this.cmpToEdit)
        },
        updateUrl(url) {
            this.newUrl = this.cmpToEdit.data[url]
            this.selectedPicture = url
        },
        saveNewUrl() {
            console.log(this.newUrl)
            this.cmpToEdit.data.imgUrl = this.newUrl
            this.updateCmp(this.cmpToEdit)
        },
        moveCmp(isUp) {
            this.$store.dispatch({ type: "moveCmp", cmp: this.cmpToEdit, isUp });
        },
        deleteCmp() {
            this.isEditMode = false;
            this.$store.dispatch({ type: "deleteCmp", cmp: this.cmpToEdit });
        },
        enterEditMode() {
            this.isEditMode = !this.isEditMode
        },
        changeImageShape(newShape) {
            this.cmpToEdit.shape = newShape;
            this.updateCmp(this.cmpToEdit)
        }
    }
}
</script>

<style scoped lang="scss">
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

.sason {
    clip-path: url(#heart-clip);
    background-image: url(https://s3.buysellads.com/1279518/5520640-1482344315.png);
    background-size: cover;
    width: 300px;
    height: 250px;
}



.edit-btn {
    position: absolute;
    top: 0%;
    left: 85%;
    opacity: 0.2;
    transition: all .5s;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
}
</style>




