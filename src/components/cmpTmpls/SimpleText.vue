<template>
    <section class="simple-text">
        <div class="content" :style="cmp.style">
            <p :contenteditable="isEditMode">{{cmp.data.txtLine1}}</p>
            <p :contenteditable="isEditMode">{{cmp.data.txtLine2}}</p>
            <p :contenteditable="isEditMode">{{cmp.data.txtLine3}}</p>
            <br>
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
                <md-icon class="btn-close">close</md-icon>
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
}



</style>
