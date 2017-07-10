<template>
  <transition name="fade" appear>
    <section>
      <!--<h2>PUBLISH</h2>-->
      <div class="btn-holder" v-if="isLoading">
        <md-spinner md-indeterminate class="btn-holder"></md-spinner>
      </div>
      <component v-if="cmpsToDisplay" v-for="cmp in cmpsToDisplay" v-bind:is="'Dumb'+cmp.type" :key="cmp.type" :cmp="cmp">
      </component>
    </section>
  </transition>
</template>

<script>
import DumbCoupleAbout from '../components/cmpPublish/DumbCoupleAbout'
import DumbImgCarousel from '../components/cmpPublish/DumbImgCarousel'
import DumbLocationMap from '../components/cmpPublish/DumbLocationMap'
import DumbSimpleText from '../components/cmpPublish/DumbSimpleText'
import DumbSimpleTitle from '../components/cmpPublish/DumbSimpleTitle'
export default {
  name: 'PublishPage',
  components: {
    DumbCoupleAbout,
    DumbImgCarousel,
    DumbLocationMap,
    DumbSimpleText,
    DumbSimpleTitle
  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    console.log('publish page: Loading data from store');
    this.$store.dispatch({ type: 'loadCmp' })
    this.$store.dispatch({ type: 'loadPageEditObj' })
  },
  computed: {
    cmpsToDisplay() {
      var cmps = this.$store.getters.cmpsToDisplay;
      if (cmps) {
        this.isLoading = false;
      }
      return cmps;
    },
  },
}
</script>


<style scoped>
.btn-holder {
  margin-top: 10px;
  text-align: center;
}

</style>
