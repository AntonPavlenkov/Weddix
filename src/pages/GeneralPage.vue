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


<style lang="scss">
.navbar {
  background-color: #ecf3f3;
}

// section {
//   margin: 0 auto;
//   position: relative;
// }

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





//copied 

.edit-page {
  min-height: 100vh;
  line-height: 100%;
  box-sizing: border-box;
}

.cmp-father {
  margin-top: -4px;
  box-sizing: border-box;
}

.border-default {
  border-width: 2px;
  border-style: dashed;
  border-color: (rgba(0, 0, 0, 0))
}


.mark-class {
  border-color: #ff5722;
  z-index: 1;
}

.preview {
  cursor: pointer;
}

// this is in order to fix an overlap between navbar and tooltip, define spacing with footer
.btns-area {
  margin-top: 20px;
  padding-bottom: 20px;
}

.btns-row {
  margin: 10px auto;
  text-align: center;
}

.add-btn {
  margin: 10px;
}

.color-picker-btn {
  overflow: initial;
}

.cmpStyle:hover {
  box-sizing: border-box;
  outline: #42A5F5 solid 1px;
}

.dialog {
  margin: 0 auto;
  width: 70%;
}

.dialog:focus {
  outline: none;
}

.md-dialog {
  text-align: center;
  .catalogue {
    padding: 0;
    list-style: none;
    li {
      margin: 10px;
      border: 1px solid black;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    h3 {
      text-align: center;
    }
  }
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
