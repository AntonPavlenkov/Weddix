<template>
    <section class="couple-about">
        <div class="content" :style="cmp.style">
            <!--@click="modifyDragMode(true)" @blur="modifyDragMode(false)"-->
            <div class="about-1">
                <!--<span @blur="updateText('aboutName1')" @click="modifyDragMode(true)" :contenteditable="isEditMode" class="about-1-name">{{cmp.data.aboutName1}}</span>-->
                <span @blur="updateText('aboutName1')" :contenteditable="isEditMode" class="about-1-name">{{cmp.data.aboutName1}}</span>
                <img @click="updateUrl('aboutImgUrl1')" :src="cmp.data.aboutImgUrl1" class="about-1-img" width="100px" height="200px">
                <!--<span @blur="updateText('aboutInfo1')" @click="modifyDragMode(true)" :style="cmp.style" :contenteditable="isEditMode" class="about-1-info">{{cmp.data.aboutInfo1}}</span>-->
                <span @blur="updateText('aboutInfo1')" :style="cmp.style" :contenteditable="isEditMode" class="about-1-info">{{cmp.data.aboutInfo1}}</span>
            </div>
            <div class="main-img-container">
                <img @click="updateUrl('mainImgUrl')" clsas="main-img" :src="cmp.data.mainImgUrl" class="main-img" width="100%">
            </div>
            <div class="about-2">
                <!--<span @blur="updateText('aboutName2')"  @click="modifyDragMode(true)"  :contenteditable="isEditMode" class="about-2-name">{{cmp.data.aboutName2}}</span>-->
                <span @blur="updateText('aboutName2')" :contenteditable="isEditMode" class="about-2-name">{{cmp.data.aboutName2}}</span>
                <img @click="updateUrl('aboutImgUrl2')" :src="cmp.data.aboutImgUrl2" class="about-2-img" width="100px" height="200px">
                <!--<span @blur="updateText('aboutInfo2')"  @click="modifyDragMode(true)" :style="cmp.style" :contenteditable="isEditMode" class="about-2-info">{{cmp.data.aboutInfo2}}</span>-->
                <span @blur="updateText('aboutInfo2')" :style="cmp.style" :contenteditable="isEditMode" class="about-2-info">{{cmp.data.aboutInfo2}}</span>
            </div>
    
        </div>
    
        <!--edit butttons-->
        <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="toggleEditMode">
            <md-icon>edit</md-icon>
        </md-button>
        <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
        </md-button>

        <transition name="fade">
            <div v-if="isEditMode" class="edit-console" v-draggable>
                <md-input-container v-if="newUrl" md-clearable class="input-newUrl">
                    <label>Enter New Url</label>
                    <md-input v-model="newUrl"></md-input>
                </md-input-container>
                <md-button @click="saveNewUrl" v-if="newUrl" class="md-fab md-mini md-clean">
                    <md-icon>save</md-icon>
                </md-button>
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
    name: 'CoupleAbout',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit
    },
    data() {
        return {
            isEditMode: false,
            color: "",
            newUrl: '',
            selectedPicture: ''



        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
    methods: {
        updateUrl(url) {
            this.newUrl = this.cmpToEdit.data[url]
            this.selectedPicture = url
        },
        saveNewUrl() {
            console.log(this.newUrl)
            this.cmpToEdit.data[this.selectedPicture] = this.newUrl
            console.log(this.cmpToEdit.data[this.selectedPicture])
            this.updateCmp(this.cmpToEdit)
        },
        moveCmp(isUp) {
            this.$store.dispatch({ type: "moveCmp", cmp: this.cmpToEdit, isUp });
        },
        deleteCmp() {
            this.isEditMode = false;
            this.$store.dispatch({ type: "deleteCmp", cmp: this.cmpToEdit });
        },
        toggleEditMode() {
            this.isEditMode = !this.isEditMode
        },
        updateText(text) {
            this.cmpToEdit.data[text] = event.target.innerText;
            // this.modifyDragMode(true);
            this.updateCmp(this.cmpToEdit);
        },
        updateCmp(updatedCmp) {
            this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
        },
        updateColor: function (event) {
            this.color = event.color;
        },
    }
}
</script>


<style scoped>
.couple-about {
    transition: all .5s;
    box-sizing: content-box;
    width: 100%;
    position: relative;
}

.content {
    box-sizing: content-box;
    padding: 30px;
    display: flex;
    flex-flow: row nowrap;
}

.input-newUrl {
    width: 80%;
}

.about-1,
.about-2 {
    width: 40%;
    text-align: center;
    line-height: 30px;
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
.fade-leave-to {
  opacity: 0
}


@media (max-width: 650px) {
   .content {
    box-sizing: content-box;
    padding: 5px;;
    display: flex;
    flex-flow: column nowrap;
}
.main-img-container {
    width: 100%;
}
.about-1,
.about-2 {
    width: 100%;
    text-align: center;
    line-height: 30px;
}

.about-1-img,
.about-2-img {
    display: block;
    border-radius: 0;
}
.main-img {
    border-radius: 0;
}
  }
</style>
