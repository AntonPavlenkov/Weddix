<template>
    <section class="simple-text cmp-father" :style="cmp.style" :class="{'mark-class': isEditMode}">
        <div class="content" >
            <p @blur="updateText('txtLine1')" :contenteditable="isEditMode">{{cmp.data.txtLine1}}</p>
            <p @blur="updateText('txtLine2')" :contenteditable="isEditMode">{{cmp.data.txtLine2}}</p>
            <p @blur="updateText('txtLine3')" :contenteditable="isEditMode">{{cmp.data.txtLine3}}</p>
            <br>
        </div>
    
        <!--edit buttons-->
        <modify-btns @deleteCmp="deleteCmp" @toggleEditMode="toggleEditMode"></modify-btns>
    
    
        <transition name="fade">
            <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable v-draggable-touch>
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
        ModifyBtns,
        TxtToolbar,
        GeneralEdit,
        EditConsole
    },
    data() {
        return {
            color: ""
        }
    },
    computed: {
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
.simple-text {
    position: relative;
}

.content {
    margin: 0;
    padding: 0;
    line-height: 20px;
    padding: 10px;
}

</style>
