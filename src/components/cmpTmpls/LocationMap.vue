<template>
    <section class="location-map">
        <div class="content" :style="cmp.style">
            <!--map cmp-->
            <map-cmp :position="position"></map-cmp>
            <div class="address">
                <!--text area-->
                <h2>{{cmp.data.address.line1}}</h2>
                <h3>{{cmp.data.address.line2}}</h3>
                <h3>{{cmp.data.address.line3}}</h3>
                <md-button class="md-fab md-clean  md-mini color-picker-btn">
                    <md-icon>navigation</md-icon>
                    <md-tooltip md-direction="top">Take me there!</md-tooltip>
                </md-button>
            </div>
    
        </div>
    
        <!-- edit buttons-->
        <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="enterEditMode">
            <md-icon>edit</md-icon>
        </md-button>
        <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
        </md-button>
        <transition name="fade">
            <div v-if="isEditMode" class="edit-console" v-draggable>
                <map-toolbar :cmp="cmp" @update="updateCmp"></map-toolbar>
                <txt-toolbar :cmp="cmp" @update="updateCmp"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </div>
        </transition>
    </section>
</template>

<script>
import MapCmp from './MapCmp'
import MapToolbar from '../toolbars/MapToolbar'
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'

const ZOOM_CLOSE = 18;

export default {
    name: 'LocationMap',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit,
        MapCmp,
        MapToolbar
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
        },
        position() {
            return this.cmp.data.position
        },
    },

    methods: {
        dragStarted(e) {
            console.log('dragging', e);
        },
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
        updateColor: function (event) {
            this.color = event.color;
        },

    }
}
</script>


<style scoped lang="scss">
.location-map {
    transition: all .5s;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    margin-top: 5px;
}

.content {
    height: 240px;
    display: flex;
    align-items: center;
}

.address {
    margin: 0 auto;
    text-align: center;
}

p {
    margin: 0;
    padding: 0;
}

</style>
