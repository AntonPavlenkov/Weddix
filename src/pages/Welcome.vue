<template>
  <section class="main-app ltr">
  
    <div class="welcome-message">
      <span>Create a Stunning</span>
      <br>
      <span> Digital Wedding</span>
      <br>
      <span>Invitation </span>
      <br>
      <md-button @click="$router.push('/page/edit')" class="md-raised md-primary">Get Started!</md-button>
  
    </div>
  <!--<main-footer></main-footer>-->
  </section>
</template>

<script>
import MainFooter from './MainFooter'
export default {
  name: 'Welcome',
  components:{
    MainFooter
  },
  data() {
    return {


    }

  },
}
</script>

<style scoped>
section {
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  height: 60vh;
  text-align: center;
  display: flex;
  flex-flow: col wrap;
  justify-content: center;
}

.main-app {
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
</style>


