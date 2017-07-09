<template>
  <div id="app">
    <main>
<<<<<<< HEAD
        <router-view>
        </router-view>
=======
      <router-view>
      </router-view>
      
>>>>>>> origin/master
    </main>
  </div>
</template>

<script>
import MainFooter from './pages/MainFooter'
export default {
  name: 'app',
  components: {
    MainFooter
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
<<<<<<< HEAD


=======
.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
>>>>>>> origin/master
</style>
