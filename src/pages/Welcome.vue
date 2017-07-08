<template>
  <section class="main-app ltr">
  
    <div class="welcome-message">
      <span>Create a Stunning</span>
      <br>
      <span> Digital Wedding</span>
      <br>
      <span>Invitation </span>
      <br>
      <md-button @click="$router.push('/edit')" class="md-raised md-primary">Get Started!</md-button>
  
    </div>
  
  </section>
</template>

<script>
export default {
  name: 'Welcome',

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
  font-family: cursive;
  font-weight: 1000;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: center;
}

.md-raised {
  margin: 20px;
}

span {
  width: 100%;
  display: block;
  margin-top: 20px;
}
</style>


