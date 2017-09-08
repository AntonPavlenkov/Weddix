<template>
    <section class="simple-title cmp-father" :style="cmp.style" :class="{'mark-class': isEditMode}">
        <div class="content" >
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
import EditableFuncs from '../mixins/EditableFuncs'
export default {
    name: 'SimpleText',
        mixins: [EditableFuncs],
    props: {
        cmp: { type: Object, required: true },
        isFirst: Boolean , isLast: Boolean
    },
    components: {
        TxtToolbar,
        GeneralEdit,
        EditConsole,
        ModifyBtns
    },
    data() {
        return {
            color: ""
        }
    },
    computed: {
        //this is used to calculate the sub title font size as 60% from main title
        subTitleFontSize() {
            var currentFontSizeValue = this.cmp.style.fontSize;
            return +currentFontSizeValue.substring(0, currentFontSizeValue.indexOf("px")) * 0.6 + 'px';
        }
    },
    methods: {
        updateText(dataItem) {
            this.cmpToEdit.data[dataItem] = event.target.innerText;
            this.updateCmp(this.cmpToEdit);
        },
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
