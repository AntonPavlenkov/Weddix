<template>
  <section>
    <md-snackbar :md-position="'top center'" ref="snackbar" :md-duration="5000">
      <p class="message">Welcome Back!</p>
      <md-button class="md-accent" @click="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>
    <transition name="fade" appear>
      <div class="main-app ltr">
        <div class="welcome-message">
          <span>Create a Stunning</span>
          <br>
          <span> Digital Wedding</span>
          <br>
          <span>Invitation </span>
          <br>
          <md-button @click="$router.push('/page/edit')" class="md-raised md-primary">Get Started!</md-button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import MainFooter from './MainFooter'
export default {
  name: 'Welcome',
  components: {
    MainFooter
  },
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadUser' })
},
  computed: {
    isReturningUser() {return this.$store.state.isReturningUser},
  },
  watch: {
    isReturningUser:   function(newVal){this.$refs['snackbar'].open()}
}
}
</script>

<style scoped>
.main-app {
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  height: 60vh;
  text-align: center;
  display: flex;
  flex-flow: col wrap;
  justify-content: center;
/*}

.main-app {*/
  background-position: 0% 0%;
  height: 100vh;
  background-image: url(../assets/land2.png);
  background-repeat: repeat;
  transition: background-position 15000ms ease-out;
}

.main-app.ltr {
  background-position: 100% top;
}

.main-app.ltr:hover {
  background-position: 0 top;
}

.welcome-message {
  font-size: 3em;
  font-family: 'Dancing Script', cursive;
  font-weight: 900;
  line-height: 1em;
  letter-spacing: 0.1em;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: center;
  text-shadow: 4px 4px 8px rgba(154, 150, 150, 1);
}

.md-raised {
  margin: 40px;
}

span {
  width: 100%;
  display: block;
  margin-top: 20px;
}

.message{
  font-family: 'Handlee';
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


