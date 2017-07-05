<template>
  <div id="app">
    <header>
      <h1>Weddix</h1>
      <md-bottom-bar>
        <md-bottom-bar-item md-icon="mode_edit" @click="changeRoute" md-active>Edit</md-bottom-bar-item>
        <md-bottom-bar-item md-icon="favorite" @click="changeRoute">Publish</md-bottom-bar-item>
      </md-bottom-bar>
    </header>
    <main>
      <router-view>
      </router-view>
    </main>
    <footer> I AM FOOTER</footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    changeRoute(e) {
      var destRoute = (e.target.innerText.toLowerCase().includes('edit')) ? '/edit' : '/publish';
      this.$router.push(destRoute)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

header {
  text-align: center;

}
</style>
