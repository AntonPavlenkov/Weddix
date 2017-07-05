<template>
  <section>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Lorem ipsum dolor sit amet</md-dialog-title>
  
      <md-dialog-content>
        <ul>
          <li v-for="(cmp, idx) in tmplCmps" :key="idx">{{cmp.type}} </li>
        </ul>
      </md-dialog-content>
  
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialog1')">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('dialog1')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>
  
    <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
      <md-dialog-title>Create new note</md-dialog-title>
  
      <md-dialog-content>
        <form>
          <md-input-container>
            <label>Note</label>
            <md-textarea></md-textarea>
          </md-input-container>
        </form>
      </md-dialog-content>
  
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialog2')">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('dialog2')">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
  
    <!--<md-button class="md-primary md-raised" id="custom" @click="openDialog('dialog1')">Custom</md-button>
    <md-button class="md-fab md-fab-bottom-right" id="fab" @click="openDialog('dialog2')">
      <md-icon>add</md-icon>
    </md-button>-->
  
    <component v-for="cmp in selectedCmps" v-bind:is="cmp.name" :key="cmp.name" :cmp="cmp">
      <!-- component changes when vm.currentView changes! -->
    </component>
  
    <!--<span class="add-btn">
      <button @click="showTmplCmps">+</button>
    </span>-->
    <md-button class="md-primary md-raised" id="custom" @click="openDialog('dialog1')">Custom</md-button>
  </section>
</template>

<script>
import SimpleText from './SimpleText'
import SimpleTitle from './SimpleTitle'
export default {
  name: 'hello',
  created() {

  },
  data() {
    return {
      tmplCmps: this.$store.state.tmplCmps,
      newCmpName: null
    }
  },
  computed: {
    selectedCmps() {
      console.log(this.$store.state.selectedCmps, 'Data from store')
      return this.$store.state.selectedCmps
    }
  },
  methods: {
    showTmplCmps() {
      console.log(this.tmplCmps, 'These Templates')
      this.newCmpName = prompt('choose tmpl')//NEEEDED TO CHANGE
      this.$store.dispatch({ type: 'addCmp', newCmpName: this.newCmpName })
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
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

diiiv {
  position: relative;
  height: 250px;
  background-color: lightblue;
  /*margin-top: 5px;*/
}

div :hover {
  display: fixed;
}
</style>
