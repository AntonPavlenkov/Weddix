<template>
  <section v-if="user" class="edit-page" :style="user.pageStyle">
    <md-dialog class="dialog" md-open-from="#custom" md-close-to="#custom" ref="addDialog">
      <md-dialog-title>Choose new component</md-dialog-title>
      <md-dialog-content>
        <ul class="catalogue">
          <li class="preview" v-for="(cmp, idx) in tmplCmps" @click="addNewCmp(cmp.type)" :key="idx">
            <div :src="cmp.cmpPreview" class="content-container">
              <h3>{{cmp.label}}</h3>
              <img :src="cmp.cmpPreview">
            </div>
          </li>
        </ul>
      </md-dialog-content>
  
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('addDialog')">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
  
    <draggable :list="cmpsToDisplay" @end="onDragEnd" :options="{draggable:'section', handle:'.btn-dragndrop', chosenClass:'mark-class'}">
      <transition-group name="cmps-list" appear>
        <component v-for="(cmp, idx) in cmpsToDisplay" v-bind:is="cmp.type" :key="idx" :cmp="cmp" :isFirst="idx === 0" :isLast="idx === lastIdxCmps" class="border-default">
        </component>
      </transition-group>
    </draggable>
  
    <div class="btn-holder" v-if="isLoading">
      <md-spinner md-indeterminate class="btn-holder"></md-spinner>
    </div>
    <div class="btn-holder" >
      <md-button v-if="!isReturningUser" class="md-icon-button md-raised md-warn add-btn" id="custom" @click="getTemplate()">
        <md-icon>note_add</md-icon>
        <md-tooltip md-direction="top">Start from Template</md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised md-warn" @click="resetAll">
        <md-icon>delete_forever</md-icon>
        <md-tooltip md-direction="top">Reset All</md-tooltip>
      </md-button>
    </div>
  
    <div class="btn-holder">
      <md-button class="md-icon-button md-raised md-primary add-btn" id="custom" @click="openDialog('addDialog')">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="top">Add component</md-tooltip>
      </md-button>
      <md-button md-menu-trigger class="md-icon-button md-raised md-primary color-picker-btn">
        <md-icon>format_paint</md-icon>
        <color-picker :change="updateColor" @changeColor="changeCssProperty('backgroundColor',$event)"></color-picker>
        <md-tooltip md-direction="top">Change page background color</md-tooltip>
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
import GiftPicker from '../components/cmpTmpls/GiftPicker'
import ColorPicker from '../components/toolbars/ColorPicker'
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
    CountDown,
    GiftPicker,
    ColorPicker
  },
  //need to consider if this is needed, or to use the load done on "welcome"
  created() {
    this.$store.dispatch({ type: 'loadUser' })
  },
  data() {
    return {
      tmplCmps: this.$store.state.tmplCmps,
      newCmpType: null,
      color: ""
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
    user() {
      return this.$store.state.user;
    },

    userToEdit() {
      return JSON.parse(JSON.stringify(this.$store.state.user))
    },
    isReturningUser() {
      return this.$store.state.isReturningUser;
    }

  },
  methods: {
    resetAll(){
      this.userToEdit.pageStyle= {};
      this.userToEdit.cmps = [];
      this.$store.dispatch({ type: 'resetAll', user: this.userToEdit})
    },
    getTemplate() {
      this.addNewCmp('SimpleTitle');
      this.addNewCmp('CoupleAbout');
      this.addNewCmp('SimpleText');
      this.addNewCmp('ImgCarousel');
      this.changeCssProperty('backgroundColor','hsl(36, 99.99999999999991%, 97%)');   
    },
    addNewCmp(newCmpType) {
      this.closeDialog('addDialog')
      this.$store.dispatch({ type: 'addCmp', newCmpType })
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onDragEnd(ev) {
      var newIndex = ev.newIndex;
      var oldIndex = ev.oldIndex;
      this.$store.dispatch({ type: 'dragCmp', newIndex, oldIndex })
    },
    updateColor: function (event) {
      this.color = event.color;
    },
    changeCssProperty(prop, val) {
      this.userToEdit.pageStyle[prop] = val;
      this.$store.dispatch({ type: "updateUser", user: this.userToEdit });
    }
  },
}
</script>


<style style lang="scss">
.edit-page {
  min-height: 100vh;
  line-height: 100%;
  box-sizing: border-box;
}

.cmp-father {
  margin-top: -4px;
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

.add-btn {
  margin: 10px;
}

.color-picker-btn {
  overflow: initial;
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


.content-container {
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

.btn-modify,
.btn-delete:hover {
  cursor: pointer;
}

.btn-dragndrop {
  top: 60px;
}

.btn-dragndrop:hover {
  cursor: move;
}

.btn-delete {
  top: 110px;
}
.cmps-list-enter-active,
.cmps-list-leave-active {
  transition: all 1s;
}

.cmps-list-enter{
  opacity: 0;
  transform: rotateX(180deg);
}

.cmps-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

</style>
