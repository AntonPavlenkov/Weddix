<template>
  <div id="app">

    <main>
      <router-view>
      </router-view>
    </main>
    <!--<MainFooter> 
      
    </MainFooter>-->
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
    changeRoute(e){
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
