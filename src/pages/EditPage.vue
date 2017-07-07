<template>
  <section>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="addDialog">
      <md-dialog-title>Choose new component</md-dialog-title>
  
      <md-dialog-content>
        <ul class="catalogue">
          <li v-for="(cmp, idx) in tmplCmps" :key="idx">
            <md-radio v-model="newCmpType" :md-value="cmp.type" :isEditMode="false">
            </md-radio>
            <div class="content-container">
              <h3>{{cmp.type}}</h3>
              <component v-bind:is="cmp.type" :cmp="cmp"></component>
            </div>
          </li>
        </ul>
      </md-dialog-content>
  
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('addDialog')">Cancel</md-button>
        <md-button class="md-primary" @click="addNewCmp">Add</md-button>
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
    </md-dialog>
    <transition-group v-if="cmpsToDisplay" name="list" tag="p">
  
      <component v-for="(cmp, idx) in cmpsToDisplay" v-bind:is="cmp.type" :key="cmp._id" :cmp="cmp" :isEditable="true" :isFirst="idx === 0" :isLast="idx === lastIdxCmps">
      </component>
    </transition-group>
    <div class="btn-holder" v-if="isLoading">
      <md-spinner md-indeterminate class="btn-holder"></md-spinner>
    </div>
    <div class="btn-holder">
      <md-button class="md-icon-button md-raised md-primary" id="custom" @click="openDialog('addDialog')">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  
  </section>
</template>

<script>
import SimpleText from '../components/cmpTmpls/SimpleText'
import SimpleTitle from '../components/cmpTmpls/SimpleTitle'
import LocationMap from '../components/cmpTmpls/LocationMap'
import ImgCarousel from '../components/cmpTmpls/ImgCarousel'
import CoupleAbout from '../components/cmpTmpls/CoupleAbout'
export default {
  name: 'EditPage',
  components: {
    SimpleText,
    SimpleTitle,
    LocationMap,
    ImgCarousel,
    CoupleAbout
  },
  created() {
    console.log('edit page: Loading data from store');
    this.$store.dispatch({ type: 'loadCmp' })
    this.$store.dispatch({ type: 'loadPageEditObj' })
  },
  data() {
    return {
      tmplCmps: this.$store.state.tmplCmps,
      newCmpType: null,
      
    }
  },
  computed: {
    cmpsToDisplay() {
      return this.$store.getters.cmpsToDisplay;
    },
    lastIdxCmps() {
      return this.cmpsToDisplay.length - 1;
    },
    isLoading(){
      return this.$store.getters.isLoading;
    },

  },
  methods: {
    addNewCmp() {
      this.closeDialog('addDialog')
      console.log(this.newCmpType, 'new cmp type')
      var newCmpType = this.newCmpType;
      this.$store.dispatch({ type: 'addCmp', newCmpType })
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    // onOpen() {
    //   console.log('Opened');
    // },
    // onClose(type) {
    //   console.log('Closed', type);
    // }
  },

}
</script>


<style scoped style lang="scss">
section {
  width: 90%;
  margin: 0 auto;
}

div :hover {
  display: fixed;
}

.btn-holder {
  margin-top: 10px;
  text-align: center;
}

.md-dialog {
  text-align: center;
  .catalogue {
    padding: 0;
    list-style: none;
    li {
      margin: 10px;
      border: 1px solid black;
      display: flex;
      flex-direction: row;
      align-items: center;
      .content-container {
        width: 100%;
      }
    }
    h3 {
      text-align: center;
    }
  }
}


.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
