<template>
    <section class="simple-text">
        <div class="content" :style="cmpToEdit.style">
            <span :contenteditable="isEditMode">{{cmpToEdit.data}}</span>
            <br>
            <span :contenteditable="isEditMode"> Hello world </span>
    
            <md-button class="md-fab edit-btn md-mini md-warn" @click="enterEditMode">
                <md-icon>edit</md-icon>
            </md-button>
    
        </div>
        <transition name="fade">
            <div v-if="isEditMode" class="edit-console">
                <txt-toolbar :cmp="cmp" @updateStyle="updateNewStyle"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @updateStyle="updateNewStyle"></general-edit>
            </div>
        </transition>
    </section>
</template>

<script>
import TxtToolbar from './txtToolbar/TxtToolbar'
import GeneralEdit from './generalEditToolbar/generalEditToolbar'
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
            cmpToEdit: null

        }
    },
    computed: {

    },
    created() {
        this.cmpToEdit = JSON.parse(JSON.stringify(this.cmp));
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
        changeBgColor() {
            console.log('cmpToEdit', this.cmpToEdit)
            var newBgColor = prompt('enter new color');
            this.cmpToEdit.style.backgroundColor = newBgColor;
            console.log('cmpToEdit', this.cmpToEdit);
            this.updateCmp();
        },
        changeStyleAtt() {

        },
        updateCmp() {
            this.$store.dispatch({ type: "updateCmp", cmp: this.cmpToEdit });
        },
        updateNewStyle(cmpWithNewStyle) {
            console.log(cmpWithNewStyle, 'Updated style')
            this.cmpToEdit = cmpWithNewStyle
            this.updateCmp()

        }
    },
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
    transition: all .5s;
    position: relative;
    /*width: 100%;*/
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
</style>
