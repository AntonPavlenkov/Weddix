<template>
  <section class="edit-page">
    <md-dialog class="dialog" md-open-from="#custom" md-close-to="#custom" ref="addDialog">
      <md-dialog-title>Choose new component</md-dialog-title>
      <md-dialog-content>
        <ul class="catalogue">
          <li class="preview" v-for="(cmp, idx) in tmplCmps" @click="addNewCmp(cmp.type)" :key="idx">
            <div :src="cmp.cmpPreview" class="content-container">
              <h3>{{cmp.type}}</h3>
              <img :src="cmp.cmpPreview">
            </div>
          </li>
        </ul>
      </md-dialog-content>
  
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('addDialog')">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
  
    <draggable :list="cmpsToDisplay" @end="onEnd" :options="{draggable:'section', handle:'.btn-dragndrop', chosenClass:'mark-class'}">
      <transition-group name="cmps" tag="p">
        <component 
        v-for="(cmp, idx) in cmpsToDisplay" v-bind:is="cmp.type" :key="cmp._id" :cmp="cmp" :isFirst="idx === 0" :isLast="idx === lastIdxCmps"
        class="border-default"
        >
        </component>
      </transition-group>
    </draggable>
  
    <div class="btn-holder" v-if="isLoading">
      <md-spinner md-indeterminate class="btn-holder"></md-spinner>
    </div>
  
    <div class="btn-holder">
      <md-button class="md-icon-button md-raised md-primary add-btn" id="custom" @click="openDialog('addDialog')">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import SimpleText from '../components/cmpTmpls/SimpleText'
import SimpleTitle from '../components/cmpTmpls/SimpleTitle'
import LocationMap from '../components/cmpTmpls/LocationMap'
import ImgCarousel from '../components/cmpTmpls/ImgCarousel'
import CoupleAbout from '../components/cmpTmpls/CoupleAbout'
import ImgTitle from '../components/cmpTmpls/ImgTitle'
import CountDown from '../components/cmpTmpls/CountDown'
export default {
  name: 'EditPage',
  components: {
    SimpleText,
    SimpleTitle,
    LocationMap,
    ImgCarousel,
    CoupleAbout,
    ImgTitle,
    draggable,
    CountDown
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
    isLoading() {
      return this.$store.getters.isLoading;
    },

  },
  methods: {
    addNewCmp(newCmp) {
      this.closeDialog('addDialog')
      console.log(this.newCmpType, 'new cmp type', newCmp)
      var newCmpType = newCmp;
      this.$store.dispatch({ type: 'addCmp', newCmpType })
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onEnd(ev) {
      var newIndex = ev.newIndex;
      var oldIndex = ev.oldIndex;
      this.$store.dispatch({ type: 'dragCmp', newIndex, oldIndex })
    },
  },

}
</script>


<style style lang="scss">
.edit-page {
  min-height: 100vh;
  line-height: 100%;
  box-sizing: border-box;
}

.border-default {
  border-width: 2px;
  border-style: dashed;
  border-color: (rgba(0, 0, 0, 0))
}


.mark-class {
  border-color: #ff5722;
  z-index: 1;
}
.mark-class-edit {
  border-color: red;
  z-index: 1;
}

.preview {
  cursor: pointer;
}

.btn-holder {
  margin: 10px auto;
  text-align: center;
}
.add-btn{
  margin: 10px;
}

.cmpStyle:hover {
  box-sizing: border-box;
  outline: #42A5F5 solid 1px;
}

.dialog {
  margin: 0 auto;
  width: 70%;
}

.dialog:focus {
  outline: none;
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
    }
    h3 {
      text-align: center;
    }
  }
}


.content-container{
  text-align: center;
  width: 100%;
}

.btn-modify {
  position: absolute;
  opacity: 0.2;
  transition: all .5s;
  right: 5%;
}

.btn-modify:hover {
  opacity: 1;
}

.btn-edit {
  top: 10px;
}

.btn-modify:hover {
  cursor: pointer;
}

.btn-dragndrop {
  top: 60px;
}

.btn-dragndrop:hover {
  cursor: move;
}

.edit-console {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  z-index: 99;
  padding: 5px;
  position: absolute;
  width: 300px;
  border: 1px solid lightgrey;
  top: 10%;
  right: 10%;
  background-color: white;
  opacity: 0.95;
  box-shadow: 8px 9px 55px -7px rgba(0, 0, 0, 0.67);
  border-radius: 5px;
  cursor: move;
  p {
    width: 100%;
    text-align: center;
    background-color: #f9d8ce;
    font-size: 16px;
  }
  .btn-close {
    position: absolute;
    top: 10px;
    right: 0;
    cursor: pointer;
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
