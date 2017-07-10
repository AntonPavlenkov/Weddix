<template>
     <section class="location-map cmp-father" :style="cmp.style">
        <div class="content">
            <!--map cmp-->
            <map-cmp :position="position" :zoom="zoom" :center="position"></map-cmp>
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
    </section>
</template>

<script>
import MapCmp from '../cmpTmpls/MapCmp'

export default {
    name: 'DumbLocationMap',
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
