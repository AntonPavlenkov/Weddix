<template>
  <section class="main-app ltr">
  
    <span class="welcome-message"><p>Create a Stunning</p>
      <p> Digital Wedding</p>
      <p>Invitation </p>
    <md-button @click="$router.push('/edit')" class="md-raised md-primary">Get Started!</md-button>
      
      
      </span>
  
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
  background-image: url(../assets/land.png);
  transition: background-position 15000ms ease-out;
}

.main-app.ltr {
  background-position: 100% center;
}

.main-app.ltr:hover {
  background-position: 0 center;
}

.welcome-message {
  font-size: 3em;
  font-family: fantasy;
  font-weight: bold;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
}

.md-raised {
  margin: 20px;
}
</style>


