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

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #F9FAFC;
}

header {
  text-align: center;
}

.home {
  cursor: pointer;
  color: palevioletred;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 1.3em;
}

a.router-link-active {
  text-decoration-style: none;
}

router-view {
  background-color: #F9FAFC;
}
</style>
