<template>
  <section>
    <h2>publish page</h2>
      
    <!--<component v-for="cmp in selectedCmps" v-bind:is="cmp.name" :key="cmp.name" :cmp="cmp">
    </component>-->
   
  </section>
</template>

<script>
import SimpleText from '../components/cmpTmpls/SimpleText'
import SimpleTitle from '../components/cmpTmpls/SimpleTitle'
export default {
  name: 'PublishPage',
  data() {
    return {

    }
  },
  computed: {
    selectedCmps() {
      return this.$store.state.selectedCmps
    }
  },

components: {
  SimpleText,
    SimpleTitle
}
}
</script>


<style scoped>
section {
  width: 90%;
  margin: 0 auto;
}

</style>
