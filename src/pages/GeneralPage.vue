<template>
  <transition name="fade" appear>
    <section>
      <header class="navbar">
        <div class="logo" @click="goHome()">Weddix</div>
        <md-tabs class="md-transparent" md-right @change="changeRoute">
          <md-tab md-icon="mode_edit" md-label="EDIT" md-active md-tooltip="Edit your invitation">
          </md-tab>
          <md-tab md-icon="laptop" md-label="PREVIEW" md-tooltip="Preview your invitation">
          </md-tab>
          <md-tab md-icon="cloud_upload" md-label="PUBLISH" md-tooltip="Get a direct link">
          </md-tab>
        </md-tabs>
      </header>
      <router-view>
      </router-view>
      <main-footer></main-footer>
    </section>
  </transition>
</template>

<script>
import MainFooter from './MainFooter'
export default {
  name: 'GeneralPage',
  computed: {
    pageId() { return this.$store.state.pageEditObj._id }
  },
  mounted() {
    //this elemenmt is not relevant to our app
    var elTabsContent = document.querySelector('.md-tabs-content')
    elTabsContent.style.display = 'none';
  },
  methods: {
    changeRoute(tabIdx) {
      var destRoute;
      switch (tabIdx) {
        case 0:
          destRoute = '/page/edit';
          break;
        case 1:
          destRoute = '/page/preview';
          break;
        case 2:
          destRoute = '/publish/' + this.pageId;
      }
      this.$router.push(destRoute);
    },
    goHome() {
      console.log('hohome')
      this.$router.push('/');
    }
  },
  components: {
    MainFooter
  }
}
</script>


<style scoped lang="scss">

.navbar {
  background-color: #ecf3f3;
}

section {
  margin: 0 auto;
  position: relative;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
