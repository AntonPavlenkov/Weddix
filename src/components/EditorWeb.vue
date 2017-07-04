<template>
<section>
  <component v-for="cmp in selectedCmps" v-bind:is="cmp.name" :key="cmp.name" :cmp="cmp">
  <!-- component changes when vm.currentView changes! -->
</component>

<span class="add-btn">
  <button @click="showTmplCmps">+</button>
</span>






  </section>
</template>

<script>
import SimpleText from './SimpleText'
import SimpleTitle from './SimpleTitle'
export default {
  name: 'hello',
  created(){

  },
  data () {
    return {
      tmplCmps: this.$store.state.tmplCmps,
      newCmpName: null
    }
  },
  computed:{
    selectedCmps(){
      console.log(this.$store.state.selectedCmps, 'Data from store')
      return this.$store.state.selectedCmps
    }
  },
methods:{
showTmplCmps(){
  console.log(this.tmplCmps, 'These Templates')
  this.newCmpName = prompt('choose tmpl')//NEEEDED TO CHANGE
  this.$store.dispatch({type:'addCmp', newCmpName:this.newCmpName})
  
}
},
  components:{
    SimpleText,
    SimpleTitle
  }
}
</script>


<style scoped>
section{
  width:90%;
  margin: 0 auto;
  

}

div{
  position: relative;
  height: 250px;
  background-color: lightblue;
  /*margin-top: 5px;*/
}
div :hover{
  display: fixed;
}

</style>
