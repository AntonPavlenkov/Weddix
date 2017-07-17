<template>
  <transition name="fade" appear>
    <section class="page-general-container">
      <header class="navbar">
        <div class="logo" @click="goHome()">Weddix</div>
        <md-tabs class="md-transparent navbar-tabs" md-right md-dynamic-height :md-navigation="false" @change="changeRoute">
          <md-tab md-icon="mode_edit" md-label="EDIT" md-active md-tooltip="Edit your invitation">
          </md-tab>
          <md-tab md-icon="laptop" md-label="PREVIEW" md-tooltip="Preview your invitation">
          </md-tab>
          <md-tab md-icon="cloud_upload" md-label="PUBLISH" md-tooltip="Get a direct link">
          </md-tab>
          <!--<md-tab md-icon="fingerprint" md-label="ABOUT" md-tooltip=" about us">
                                                          </md-tab>-->
        </md-tabs>
        <md-button class="md-icon-button hamburger" @click="toggleRightSidenav">
          <md-icon>menu</md-icon>
        </md-button>
  
      </header>
  
      <div class="page-general-content">
  
        <router-view>
        </router-view>
  
      </div>
  
      <!--off-canvas menu for mobile-->
      <div class="side-nav-content" ref="sidenavContent">
        <md-list>
          <md-list-item class="menu-item" @click="changeRoute(0)">
            <md-icon>mode_edit</md-icon>
            <span>EDIT</span>
            <md-divider class="md-inset"></md-divider>
          </md-list-item>
  
          <md-list-item class="menu-item" @click="changeRoute(1)">
            <md-icon>laptop</md-icon>
            <span>PREVIEW</span>
            <md-divider class="md-inset"></md-divider>
          </md-list-item>
  
          <md-list-item class="menu-item" @click="changeRoute(2)">
            <md-icon>cloud_upload</md-icon>
            <span>PUBLISH</span>
            <md-divider class="md-inset"></md-divider>
          </md-list-item>
        </md-list>
  
        <md-button class="md-primary" @click="closeRightSidenav">Close</md-button>
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
    //this elemenmt is not relevant to our app so we hide it
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
          break;
        case 3:
          console.log('eld')
          destRoute = '/page/about';
      }
      if (destRoute.startsWith('/publish')) window.open(destRoute)
      else this.$router.push(destRoute);
      this.closeRightSidenav();
    },
    goHome() {
      this.$router.push('/');
    },
    toggleRightSidenav() {
      if (this.$refs.sidenavContent.classList.contains('open-side-nav'))
        this.closeRightSidenav();
      else {
        this.$refs.sidenavContent.classList.add('open-side-nav');
        // this.$refs.rightSidenavBg.classList.add('open-side-nav-bg');
        // this.$refs.rightSidenavContainer.classList.add('side-nav-open');
      }
    },
    closeRightSidenav() {
      this.$refs.sidenavContent.classList.remove('open-side-nav');
      // this.$refs.rightSidenavBg.classList.remove('open-side-nav-bg');
      // this.$refs.rightSidenavContainer.classList.remove('side-nav-open');
    },
  },
  components: {
    MainFooter
  }
}
</script>


<style lang="scss">
.hamburger {
  display: none;
}

.side-nav-content {
  z-index: 999;
  position: fixed;
  top: 72px;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  transform: translateX(2000px);
  transition: all 0.5s;
}

.open-side-nav {
  transform: translateX(0);
}


.menu-item {
  cursor: pointer;
}

.page-general-container {
  display: flex;
  flex-flow: column nowrap; // overflow: hidden;
}

.page-general-content {
  display: flex;
  flex-flow: column nowrap; // overflow-y: scroll;
  padding-top: 72px; // height: 100vh;
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
  position: fixed;
  z-index: 800;
  width: 100%;
  opacity: 1;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  background-color: #ecf3f3;
  letter-spacing: 0.2em;
  height: 72px;
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

@media (max-width: 420px) {
  .navbar-tabs {
    display: none;
  }

  .hamburger {
    display: block;
  }
}
</style>
