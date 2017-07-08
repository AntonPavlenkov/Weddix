<template>
  <div id="app">
    <header>
      <span @click="changeRoute('/')" class="home"><h1> Weddix </h1></span>
      <md-bottom-bar>
        <md-bottom-bar-item md-icon="mode_edit" @click="changeRoute('/edit')" md-active>Edit</md-bottom-bar-item>
        <md-bottom-bar-item md-icon="favorite" @click="changeRoute('/publish')">Publish</md-bottom-bar-item>
      </md-bottom-bar>
    </header>
    <main>
     
      <router-view>
      </router-view>
      
    </main>
    <MainFooter> 
      
    </MainFooter>
  </div>
</template>

<script>
import MainFooter from './pages/MainFooter'
export default {
  name: 'app',
  components:{
    MainFooter
  },
  methods:{
    changeRoute(dir){
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
.home{
  cursor: pointer;
  color: palevioletred;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 1.3em;
}
a.router-link-active{
  text-decoration-style: none;
}
router-view{
  background-color: #F9FAFC;
}

</style>
