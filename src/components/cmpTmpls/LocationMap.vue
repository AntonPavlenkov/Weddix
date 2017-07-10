<template>
    <section class="location-map cmp-father" :style="cmp.style">
        <div class="content"  :class="{'mark-class': isEditMode}">
            <!--map cmp-->
            <map-cmp :position="position" :zoom="zoom"></map-cmp>
            <div class="address">
                <!--text area-->
                <h2>{{cmp.data.address.line1}}</h2>
                <h3>{{cmp.data.address.line2}}</h3>
                <h3>{{cmp.data.address.line3}}</h3>
                <md-button class="md-fab md-clean md-mini">
                    <md-icon>navigation</md-icon>
                    <md-tooltip md-direction="top">Take me there!</md-tooltip>
                </md-button>
            </div>
        </div>
    
        <!-- edit buttons-->
        <modify-btns @deleteCmp="deleteCmp" @toggleEditMode="toggleEditMode"></modify-btns>
    
        <transition name="fade">
            <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
                <map-toolbar :cmp="cmp" @update="updateCmp"></map-toolbar>
                <txt-toolbar :cmp="cmp" @update="updateCmp"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </edit-console>
        </transition>
    </section>
</template>

<script>
import ModifyBtns from '../toolbars/ModifyBtns'
import MapCmp from './MapCmp'
import MapToolbar from '../toolbars/MapToolbar'
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'
import EditConsole from '../toolbars/EditConsole'

const ZOOM_CLOSE = 18;

export default {
    name: 'LocationMap',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit,
        MapCmp,
        MapToolbar,
        EditConsole,
        ModifyBtns
    },
    data() {
        return {
            isEditMode: false,
            // color: "",
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        },
        position() {
            return this.cmp.data.position
        },
        zoom() {
            return this.cmp.data.zoom
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
        // updateColor: function (event) {
        //     this.color = event.color;
        // },

    }
}
</script>


<style scoped lang="scss">
.location-map {
    box-sizing: border-box;
    position: relative;
}
.content {
    padding: 20px 0;
    display: flex;
    align-items: center;
}

.address {
    margin: 0 auto;
    text-align: center;
}

@media (max-width: 650px) {
    .content {
        flex-flow: column-reverse nowrap;
        padding: 5px;
    }
}
</style>
