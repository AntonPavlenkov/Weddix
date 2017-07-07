<template>
  <section>
    <h2>publish page</h2>
    <component v-if="cmpsToDisplay" v-for="cmp in cmpsToDisplay" v-bind:is="'Dumb'+cmp.type" :key="cmp.type" :cmp="cmp">
      </component>
  
  </section>
</template>

<script>
import DumbCoupleAbout from '../components/cmpPublish/DumbCoupleAbout'
import DumbImgCarousel from '../components/cmpPublish/DumbImgCarousel'
import DumbLocationMap from '../components/cmpPublish/DumbLocationMap'
import DumbSimpleText from '../components/cmpPublish/DumbSimpleText'
export default {
  name: 'PublishPage',
  components: {
    DumbCoupleAbout,
    DumbImgCarousel,
    DumbLocationMap,
    DumbSimpleText
  },
  data() {
    return {
    }
  },
  computed: {
    cmpsToDisplay() {
      return this.$store.getters.cmpsToDisplay;
    },
  },

}
</script>


<style scoped>
section {
  width: 90%;
  margin: 0 auto;
}
</style>
