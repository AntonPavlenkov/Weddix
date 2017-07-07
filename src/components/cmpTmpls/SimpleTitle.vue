<template>
    <section class="simple-title">
        <div class="content" :style="cmp.style">
            <p :contenteditable="isEditMode" class="main-title">{{cmp.data.mainTitle}}</p>
            <br>
            <p :contenteditable="isEditMode" class="sub-title"> {{cmp.data.subTitle}} </p>
            <md-button class="md-fab edit-btn md-mini md-warn" @click="enterEditMode">
                <md-icon>edit</md-icon>
            </md-button>    
        </div>
        <transition name="fade">
            <div v-if="isEditMode" class="edit-console">
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
    computed:{
        cmpToEdit(){
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
.simple-title {
    transition: all .5s;
    position: relative;
    margin-top: 30px;
    transition: all .5s;
    margin: 0;
}

p {
    margin: 0;
    padding: 0;
    line-height: 50px;
}

.main-title{
    font-size: 70px;
}

.sub-title{
    font-size: 35px;
}

.edit-btn {
    position: absolute;
    left: 85%;
    top:40%;
    opacity: 0.2;
    transition: all .5s;
}

.edit-btn:hover {
    opacity: 1;
    cursor: pointer;
}

.edit-console {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: space-between;
    background: lightgray;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to{
    opacity: 0
}

.color-picker-btn {
    overflow: initial;
}
</style>
