<template>
    <section>
        <md-button md-menu-trigger class="md-fab md-clean  md-mini color-picker-btn">
            <md-icon>format_paint</md-icon>
            <color-picker :change="updateColor" @changeColor="changeCssProperty('backgroundColor',$event)"></color-picker>
            <md-tooltip md-direction="top">Change background color</md-tooltip>
        </md-button>
        <md-button class="md-fab md-clean  md-mini" @click="deleteCmp">
            <md-icon>delete_forever</md-icon>
            <md-tooltip md-direction="top">Delete</md-tooltip>
        </md-button>
        </md-button>
        <md-button v-if="!isFirst" class="md-fab md-clean  md-mini" @click="moveCmp(false)">
            <md-icon>arrow_upward</md-icon>
            <md-tooltip md-direction="top">Move down</md-tooltip>
        </md-button>
        </md-button>
        <md-button v-if="!isLast" class="md-fab md-clean  md-mini" @click="moveCmp(true)">
            <md-icon>arrow_downward</md-icon>
            <md-tooltip md-direction="top">Move up</md-tooltip>
        </md-button>
    </section>
</template>

<script>
import ColorPicker from './ColorPicker'
export default {
    name: 'GeneralEditToolbar',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        ColorPicker
    },
    created() {
        // this.cmpStyleEdit = JSON.parse(JSON.stringify(this.cmp));
    },
    computed: {
        cmpStyleEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
    data() {
        return {
            // cmpStyleEdit: null,
            color: ""
        }
    },
    methods: {
        deleteCmp() {
            this.$emit('delete')
        },
        moveCmp(isUp) {
            this.$emit('move', isUp)
        },
        updateColor: function (event) {
            this.color = event.color;
        },

        // changeBgColor(newColor) {
        //     this.cmpStyleEdit = JSON.parse(JSON.stringify(this.cmp));
        //     this.cmpStyleEdit.style.backgroundColor = newColor;
        //     this.$emit('updateStyle', this.cmpStyleEdit)
        // },
        changeCssProperty(prop, val) {
            // console.log(prop, 'prop')
            // console.log(val,'val')
            this.cmpStyleEdit.style[prop] = val;
            this.$emit('update', this.cmpStyleEdit)
        }
    },
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

.color-picker-btn {
    overflow: initial;
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
