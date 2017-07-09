<template>
    <section class="simple-text" :class="{'mark-class': isEditMode}">
        <div class="content" :style="cmp.style">
            <p @blur="updateText('txtLine1')" :contenteditable="isEditMode">{{cmp.data.txtLine1}}</p>
            <p @blur="updateText('txtLine2')" :contenteditable="isEditMode">{{cmp.data.txtLine2}}</p>
            <p @blur="updateText('txtLine3')" :contenteditable="isEditMode">{{cmp.data.txtLine3}}</p>
            <br>
        </div>
    
        <!--edit buttons-->
        <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="toggleEditMode">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button>
        <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
            <md-tooltip md-direction="top">Reorder</md-tooltip>
        </md-button>
        <md-button class="btn-modify btn-delete md-fab md-mini md-warn" @click="deleteCmp">
            <md-icon>delete_forever</md-icon>
            <md-tooltip md-direction="top">Delete</md-tooltip>
        </md-button>
    
        <transition name="fade">
            <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
                <txt-toolbar :cmp="cmp" @update="updateCmp"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </edit-console>
        </transition>
    </section>
</template>

<script>
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'
import EditConsole from '../toolbars/EditConsole'
export default {
    name: 'SimpleText',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit,
        EditConsole
    },
    data() {
        return {
            isEditMode: false,
            color: "",
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
.simple-text {
    position: relative;
    margin: 15px 0;
    transition: all .5s;
}

.content {
    margin: 0;
    padding: 0;
    line-height: 20px;
    padding: 10px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>
