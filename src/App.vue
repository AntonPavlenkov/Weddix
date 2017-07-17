<template>
  <div id="app">
    <main>
        <router-view>
        </router-view>
    </main>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  methods: {
    changeRoute(dir) {
      // var destRoute = (e.target.innerText.toLowerCase().includes('edit')) ? '/edit' : '/publish';
      this.$router.push(dir)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  /*this is in order to diable horizontal scroll due to off-canvas menu*/
  overflow-x: hidden;
}

</style>
