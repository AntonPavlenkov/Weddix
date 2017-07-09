<template>
    <section class="location-map">
        <div class="content" :style="cmp.style">
            <!--map cmp-->
            <map-cmp :position="position" :zoom="zoom"></map-cmp>
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
    </section>
</template>

<script>
import MapCmp from '../cmpTmpls/MapCmp'

export default {
    name: 'LocationMap',
    props: ['cmp'],
    components: {
        MapCmp,
    },
    computed: {
        position() {
            return this.cmp.data.position
        },
        zoom() {
            return this.cmp.data.zoom
        }
    }
}
</script>


<style scoped>
.location-map {
    transition: all .5s;
    position: relative;
    margin-top: 5px;
    transition: all .5s;
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

.edit-btn {
    position: absolute;
    left: 85%;
    top: 40%;
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
    /*background: lightgray;*/
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
