<template>
  <section v-if="user" class="edit-page" :style="user.pageStyle">
    <div class="nav-divider"></div>
    <draggable :list="cmpsToDisplay" :options="{draggable:'none'}">
      <transition-group name="cmps-list" tag="div" appear>
        <component v-for="(cmp, idx) in cmpsToDisplay" v-bind:is="'Dumb'+cmp.type" :key="idx" :cmp="cmp" class="border-default">
        </component>
      </transition-group>
    </draggable>
    <div class="btns-row" v-if="isLoading">
      <md-spinner md-indeterminate class="btns-row"></md-spinner>
    </div>
  </section>
</template>

<script>
import Draggable from 'vuedraggable'
import DumbCoupleAbout from '../components/cmpPublish/DumbCoupleAbout'
import DumbImgCarousel from '../components/cmpPublish/DumbImgCarousel'
import DumbLocationMap from '../components/cmpPublish/DumbLocationMap'
import DumbSimpleText from '../components/cmpPublish/DumbSimpleText'
import DumbSimpleTitle from '../components/cmpPublish/DumbSimpleTitle'
import DumbCountDown from '../components/cmpPublish/DumbCountDown'
import DumbImgTitle from '../components/cmpPublish/DumbImgTitle'
import DumbGiftPicker from '../components/cmpPublish/DumbGiftPicker'
export default {
  name: 'PublishPage',
  components: {
    DumbImgTitle,
    DumbCountDown,
    DumbCoupleAbout,
    DumbImgCarousel,
    DumbLocationMap,
    DumbSimpleText,
    DumbSimpleTitle,
    DumbGiftPicker,
    Draggable
  },
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    console.log('publish page: Loading data from store');
    this.$store.dispatch({ type: 'loadUser' })
  },
  computed: {
    cmpsToDisplay() {
      var cmps = this.$store.getters.cmpsToDisplay;
      if (cmps) {
        this.isLoading = false;
      }
      return cmps;
    },
    user() {
      return this.$store.state.user;
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
