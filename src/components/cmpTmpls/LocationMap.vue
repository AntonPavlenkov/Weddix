<template>
    <section class="location-map cmp-father" :style="cmp.style" :class="{'mark-class': isEditMode}">
        <div class="content" >
            <!--map cmp-->
            <map-cmp :position="position" :zoom="zoom" :center="center"></map-cmp>
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
import EditableFuncs from '../mixins/EditableFuncs'

// const ZOOM_CLOSE = 18;

export default {
    name: 'LocationMap',
    mixins: [EditableFuncs],
    props: {
        cmp: { type: Object, required: true },
        isFirst: Boolean,
        isLast: Boolean
    },
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
            resetZoomNeeded: false
        }
    },
    computed: {
        position() {
            return this.cmp.data.position
        },
        zoom() {
            return this.cmp.data.zoom
        },
        center() {
            return this.cmp.data.position
        }
    },

    methods: {
    }
}
</script>


<style scoped lang="scss">
.location-map {
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
