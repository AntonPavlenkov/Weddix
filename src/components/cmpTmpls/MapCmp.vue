<template>
  <section class="map-cmp">
    <gmap-map class="map" :center="center" :zoom="zoom">
      <gmap-marker :position="position"></gmap-marker>
    </gmap-map>
  </section>
</template>

<script>

const CENTER_DEFAULT = { lat: 32.087893, lng: 34.803038 };
const ZOOM_DEFAULT = 11;
const ZOOM_CLOSE = 17;

export default {
  props: ['position'],
  data() {
    return {
      center: CENTER_DEFAULT,
      zoom: ZOOM_DEFAULT,
    }
  },
  methods: {
  },
  computed:{
    // newPosition(){
    //    console.log('computed')
    //     this.center = this.position;
    //     this.zoom = ZOOM_CLOSE;
    //     return this.position;
    // }
  },
  watch: {
    position: {
      handler: function (newPosition) {
        console.log('watcher')
        this.center = newPosition;
        this.zoom = ZOOM_CLOSE;
      },
      deep: true
    }
  }
}
</script> 

<style scoped>
.map-cmp {
  width: 50%;
  margin: 0 20px;
}

.map {
  width: 100%;
  height: 200px;
}
</style>