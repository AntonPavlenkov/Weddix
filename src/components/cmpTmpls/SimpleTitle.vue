<template>
<section >
    <h1>{{cmp.data.text1}}</h1>






  </section>
</template>

<script>
export default {
  name: 'SimpleTitle',
  props:['cmp'],
  data () {
    return {
        
      
    }
  }
}
</script>


<style scoped>
.simple-text{
    height: 100px;
    background-color: lightgreen;
    width: 100%;
    margin-top: 5px;
}
p{
     margin: 0;
    padding: 0;
}

</style>
