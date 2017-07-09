<template>
  <section class="map-cmp">
    <gmap-map class="map" :center="center" :zoom="zoom">
      <gmap-marker :position="position"></gmap-marker>
    </gmap-map>
  </section>
</template>

<script>

const CENTER_DEFAULT = { lat: 32.087893, lng: 34.803038 };

export default {
  props: ['position','zoom'],
  data() {
    return {
      center: CENTER_DEFAULT,
    }
  },
  watch: {
    position: {
      handler: function (newPosition) {
        this.center = newPosition;
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
  box-shadow: 8px 9px 55px -7px rgba(0,0,0,0.67);
  border: solid 1px #E5E9F2;
}

.map {
  width: 100%;
  height: 200px;
}

@media (max-width: 650px) {
  .map-cmp {
    width: 100%;
  }
}
</style>