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
    Draggable
  },
  data() {
    return {
    }
  },
  computed: {
    cmpsToDisplay() {
      return this.$store.getters.cmpsToDisplay;
    },
    user() {
      return this.$store.state.user;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },

}
</script>


<style scoped lang="scss">
.cmp-father {
  margin-top: -4px;
  box-sizing: border-box;
}

.navbar {
  background-color: #ecf3f3;
}


.logo {
  position: absolute;
  left: 25px;
  top: 25px;
  font-family: 'Rouge Script', cursive;
  font-size: 55px;
  font-weight: 900; // letter-spacing: 0.1em;
  text-shadow: 3px 3px 8px rgba(64, 117, 159, 1);
  cursor: pointer;
  z-index: 99;
}

.cmp-father {
  margin-top: -4px;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
