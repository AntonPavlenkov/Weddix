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
  
    <draggable :list="cmpsToDisplay" @end="onEnd" :options="{draggable:'section', handle:'.btn-dragndrop',disabled:dragMode}">
      <transition-group name="cmps" tag="p">
        <component @changeDragMode="changeDragMode" v-for="(cmp, idx) in cmpsToDisplay" v-bind:is="cmp.type" :key="cmp._id" :cmp="cmp" :isFirst="idx === 0" :isLast="idx === lastIdxCmps">
        </component>
      </transition-group>
    </draggable>
  
    <div class="btn-holder" v-if="isLoading">
      <md-spinner md-indeterminate class="btn-holder"></md-spinner>
    </div>
  
    <div class="btn-holder">
      <md-button class="md-icon-button md-raised md-primary" id="custom" @click="openDialog('addDialog')">
        <md-icon>add</md-icon>
      </md-button>
    </div>
  
    <!--new component modal-->
    <!--<md-dialog md-open-from="#custom" md-close-to="#custom" ref="addDialog">
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
          </md-dialog>-->
  </section>
</template>

<script>
import draggable from 'vuedraggable'
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
    CoupleAbout,
    draggable
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
      dragMode: false
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
    changeDragMode(newMode) {
      this.dragMode = newMode;
      console.log(newMode)
    }

  },

}
</script>


<style style lang="scss">
.edit-page {
  min-height: 100vh;
}

.preview {
  cursor: pointer;
}

.btn-holder {
  margin: 10px auto;
  text-align: center;
}

.cmpStyle:hover {
  box-sizing: border-box;
  outline: #42A5F5 solid 1px;
}

.dialog {
  margin: 0 auto;
  width: 70%;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.edit-console {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: space-between;
  z-index: 99;
  cursor: move;

  position: absolute;
  width: 200px;
  border: 1px solid lightgrey;
  top: 10%;
  right: 10%;
  background-color: white;
  opacity: 0.9;
  box-shadow: 8px 9px 55px -7px rgba(0, 0, 0, 0.67);
  border-radius: 5px;
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
