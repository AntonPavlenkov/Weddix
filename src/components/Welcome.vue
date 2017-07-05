<template>
  <section>
    <p class="main-title">Create a Stunning Digital Wedding Invitation</p>
    <md-button class="md-raised md-primary" @click="changeRoute">Get Started!</md-button>
  </section>
</template>

<script>
export default {
  name: 'Welcome',

  data() {
    return {


    }
  },
  methods: {
    changeRoute(){
      this.$router.push('/edit');
    }

  },
}
</script>

<style scoped>
section {
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background: url("../../assets/floral-bg.jpg") no-repeat;
  background-size: cover;
  /*background-repeat: repeat;*/
}

.main-title {
  line-height: 2em;
  font-family: 'Shadows Into Light', cursive;
  font-size: 4em;
}
</style>


