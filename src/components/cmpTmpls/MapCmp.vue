<template>
  <section class="map-cmp cmp-father">
    <gmap-map v-if="center" class="map" :center="center" :zoom="zoom">
      <gmap-marker :position="position"></gmap-marker>
    </gmap-map>
  </section>
</template>

<script>
export default {
    props: {
        cmp: { type: Object, required: true },
        isFirst: Boolean , isLast: Boolean
    },
  data(){
    return {
      center: this.position
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