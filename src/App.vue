<template>
  <div id="app">
    <header>
    <h1>Stunning Digital Wedding Invitation</h1>
    <router-link to="Edit">Edit</router-link>
    <router-link to="Publish">Publish</router-link>
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
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
 
}

main {
 
}

header {
  text-align: center;
  background-color: lightgrey;
}

header span {
  
}
</style>
