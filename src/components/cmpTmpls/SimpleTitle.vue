<template>
    <section class="simple-title cmp-father" :style="cmp.style">
        <div class="content" :class="{'mark-class': isEditMode}">
            <p @blur="updateText('mainTitle')" :contenteditable="isEditMode" class="main-title">{{cmp.data.mainTitle}}</p>
            <p @blur="updateText('subTitle')" :style="{fontSize: subTitleFontSize}" :contenteditable="isEditMode" class="sub-title"> {{cmp.data.subTitle}} </p>
        </div>
    
        <!--edit buttons-->
        <modify-btns @deleteCmp="deleteCmp" @toggleEditMode="toggleEditMode"></modify-btns>
    
        <transition name="fade">
            <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
                <txt-toolbar :cmp="cmp" @update="updateCmp"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </edit-console>
        </transition>
    </section>
</template>

<script>
import ModifyBtns from '../toolbars/ModifyBtns'
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'
import EditConsole from '../toolbars/EditConsole'
export default {
    name: 'SimpleText',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit,
        EditConsole,
        ModifyBtns
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
        },
        subTitleFontSize() {
            var currentFontSizeValue = this.cmp.style.fontSize;
            return +currentFontSizeValue.substring(0, currentFontSizeValue.indexOf("px")) * 0.6 + 'px';
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
        toggleEditMode() {
            this.isEditMode = !this.isEditMode
        },
        updateCmp(updatedCmp) {
            this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
        },
        updateText(dataItem) {
            this.cmpToEdit.data[dataItem] = event.target.innerText;
            this.updateCmp(this.cmpToEdit);
        },
    }
}
</script>


<style scoped>
.simple-title {
    transition: all .5s;
    position: relative;
    transition: all .5s;
}

.content {
    margin: 30px 0;
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
