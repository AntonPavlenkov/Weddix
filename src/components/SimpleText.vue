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
    
                <md-button @click="changeBgColor()" class="md-fab md-clean  md-mini">
                    <md-icon>format_paint</md-icon>
                </md-button>
                <md-button class="md-fab md-clean  md-mini">
                    <md-icon>delete_forever</md-icon>
                </md-button>
                </md-button>
                <md-button class="md-fab md-clean  md-mini">
                    <md-icon>arrow_upward</md-icon>
                </md-button>
                </md-button>
                <md-button class="md-fab md-clean  md-mini">
                    <md-icon>arrow_downward</md-icon>
                </md-button>
    
                <!--<button @click="changeBgColor()">change bg color</button>-->
            </div>
        </transition>
    </section>
</template>

<script>
import TxtToolbar from './txtToolbar/TxtToolbar'
export default {
    name: 'SimpleText',
    props: ['cmp'],
    components: {
        TxtToolbar
    },
    data() {
        return {
            isEditMode: false,
            cmpToEdit: null

        }
    },
    created() {
        this.cmpToEdit = JSON.parse(JSON.stringify(this.cmp));
    },
    methods: {
        enterEditMode() {
            this.isEditMode = !this.isEditMode
            console.log('Entering Edit MOde')

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
            console.log(cmpWithNewStyle)
            this.cmpToEdit = cmpWithNewStyle
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
    background-color: lightgreen;
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
