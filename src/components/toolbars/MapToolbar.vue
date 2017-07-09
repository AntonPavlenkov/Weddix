<template>
    <section>
        <md-button class="md-fab md-clean  md-mini color-picker-btn" @click="toggleInputDisplay">
            <md-icon>place</md-icon>
            <md-tooltip md-direction="top">Set Location</md-tooltip>
        </md-button>
        <gmap-autocomplete v-if="isInputShown" class="search-input" @place_changed="setPlace">
        </gmap-autocomplete>
    </section>
</template>

<script>

export default {
    name: 'MapToolbar',
    props: ['cmp'],
    components: {

    },
    created() {

    },
    computed: {
        cmpUpdated() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
    data() {
        return {
            isInputShown:false
        }
    },
    methods: {
        toggleInputDisplay(){
            this.isInputShown  = !this.isInputShown
        },
        setPlace(place) {
            //set position & close zoom:
            this.cmpUpdated.data.position = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            }
            this.cmpUpdated.data.zoom = 18;
            //set name:
            this.cmpUpdated.data.address.line1 = place.name;
            //get relevant additional info:
            var fullAddress = place.formatted_address
            var addressLines = fullAddress.split(',')
            //remove last idx (usually country)
            addressLines.splice(addressLines.length - 1)
            //put last idx in the last line and delete from array
            this.cmpUpdated.data.address.line3 = addressLines.splice(addressLines.length - 1)[0];
            //put remaining in line2:
            this.cmpUpdated.data.address.line2 = addressLines.join();
            this.$emit('update', this.cmpUpdated)
        },
    },
}
</script>


<style scoped>
.search-input {
    margin-top:10px;
    width: 200px;
    height: 30px;
    /*display: block!important;*/
}
</style>
