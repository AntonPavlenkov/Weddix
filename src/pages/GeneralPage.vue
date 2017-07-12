<template>
  <transition name="fade" appear>
    <section class="page-general-container">
      <header class="navbar">
        <div class="logo" @click="goHome()">Weddix</div>
        <md-tabs class="md-transparent" md-right md-dynamic-height @change="changeRoute">
          <md-tab md-icon="mode_edit" md-label="EDIT" md-active md-tooltip="Edit your invitation">
          </md-tab>
          <md-tab md-icon="laptop" md-label="PREVIEW" md-tooltip="Preview your invitation">
          </md-tab>
          <md-tab md-icon="cloud_upload" md-label="PUBLISH" md-tooltip="Get a direct link">
          </md-tab>
        </md-tabs>
      </header>
  
      <div class="page-general-content">
  
        <router-view>
        </router-view>
  
      </div>
  
    </section>
  </transition>
</template>

<script>
import MainFooter from './MainFooter'
export default {
  name: 'GeneralPage',
  computed: {
    pageId() { return this.$store.state.user._id }
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
      if (destRoute.startsWith('/publish'))  window.open(destRoute)
      else this.$router.push(destRoute);
    },
    goHome() {
      this.$router.push('/');
    }
  },
  components: {
    MainFooter
  }
}
</script>


<style lang="scss">
.page-general-container {
  display: flex;
  flex-flow: column nowrap;
  max-height: 100vh;
  width: 100%;
  header {
    height: 10vh;
  }
}

.page-general-content {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: scroll;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
  background-color: tomato;
}




.navbar {
  background-color: #ecf3f3;

  letter-spacing: 0.2em;
  span {
    font-family: 'Handlee';
    font-weight: bold; 
  }
  @media (max-width: 650px) {

    .logo {
      font-size: 30px;
    }
  }
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
  transition: font-size .5s;
}


.border-default {
  border-width: 2px;
  border-style: dashed;
  border-color: (rgba(0, 0, 0, 0))
}


.cmp-father {
  margin-top: -4px;
  box-sizing: border-box;
}

.btns-row {
  margin: 10px auto;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s!important;
}

.fade-enter,
.fade-leave-to {
  opacity: 0 !important;
}

.preview {
  cursor: pointer;
}


// this is in order to fix an overlap between the nav and the first cmp (kerendot)
.nav-divider {
  height: 4px;
}

.content-container {
  text-align: center;
  width: 100%;
}


.cmps-list-enter-active,
.cmps-list-leave-active {
  transition: all 1s;
}

.cmps-list-enter {
  opacity: 0;
  transform: rotateX(180deg);
}

.cmps-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
