<template>
    <section class="simple-title">
        <div class="content" :style="cmp.style">
            <!--<p :contenteditable="isEditMode" class="main-title" @click="modifyDragMode(true)" @blur="modifyDragMode(false)">{{cmp.data.mainTitle}}</p>-->
            <p @blur="updateText('mainTitle')" :contenteditable="isEditMode" class="main-title">{{cmp.data.mainTitle}}</p>
            <!--<p :contenteditable="isEditMode" class="sub-title"  @click="modifyDragMode(true)" @blur="modifyDragMode(false)"> {{cmp.data.subTitle}} </p>-->
            <p @blur="updateText('subTitle')" :contenteditable="isEditMode" class="sub-title"> {{cmp.data.subTitle}} </p>
        </div>
    
        <!--edit buttons-->
        <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="enterEditMode">
            <md-icon>edit</md-icon>
        </md-button>
        <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
        </md-button>
    
        <transition name="fade">
            <div v-if="isEditMode" class="edit-console" v-draggable>
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
    name: 'SimpleText',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit
    },
    data() {
        return {
            isEditMode: false,
            color: ""
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
    methods: {
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
        updateCmp(updatedCmp) {
            this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
        },
        updateText(dataItem) {
            this.cmpToEdit.data[dataItem] = event.target.innerText;
            this.updateCmp(this.cmpToEdit);
        },
        // modifyDragMode(newMode) {
        //     if (this.isEditMode) {
        //         console.log('inside')
        //         this.$emit('changeDragMode', newMode)
        //     }
        //     else {
        //         console.log('outside edit')
        //         this.$emit('changeDragMode', false)
        //     }
        // }
    }
}
</script>


<style scoped>
.simple-title {
    transition: all .5s;
    position: relative;
    margin-top: 30px;
    transition: all .5s;
    margin: 0;
    padding: 30px;
}

p {
    margin: 0;
    padding: 0;
    line-height: 70px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}



/*.main-title {
    font-size: 70px;
}

.sub-title {
    font-size: 35px;
}*/
</style>
