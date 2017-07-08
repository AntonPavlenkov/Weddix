<template>
    <section class="simple-text">
        <div class="content" :style="cmp.style">
            <span :contenteditable="isEditable">{{cmp.data.text_1}}</span>
            <br>
            <span :contenteditable="isEditable"> Hello world </span>
    
            <md-button class="md-fab edit-btn md-mini md-warn" @click="enterEditMode" v-if="isEditable">
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
    props: ['cmp', 'isFirst', 'isLast', 'isEditable'],
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
        // changeCssProperty(prop, val) {
        //     this.cmpToEdit.style[prop] = val;
        //     this.updateCmp(this.cmpToEdit)
        // },
        updateColor: function (event) {
            this.color = event.color;
        }

    }
    //   watch:{
    //       cmpToEdit: {
    //         handler: function(newValue) {
    //             console.log('in handler');
    //             this.$store.dispatch({type:"updateCmp", cmp:this.cmpToEdit})
    //         },
    //         deep: true           
    //       }
    //   }
}
</script>


<style scoped>
.simple-text {
    /*transition: all .5s;*/
    position: relative;
    width: 100%;
    margin-top: 5px;
    transition: all .5s;
}

.content {
    height: 100px;
}

p {
    margin: 0;
    padding: 0;
}

.edit-btn {
    position: absolute;
    left: 85%;
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
    /*top: 0;
    position: absolute;*/
    background: lightgray;
    /*width: 25%;
    z-index: 5;*/
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
    opacity: 0
}

.color-picker-btn {
    overflow: initial;
}
</style>
