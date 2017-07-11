<template>
  <section v-if="user" class="edit-page" :style="user.pageStyle">
    <div class="height-container">

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
  
    <div class="nav-divider"></div>
  
    <draggable :list="cmpsToDisplay" @end="onDragEnd" :options="{draggable:'section', handle:'.btn-dragndrop', chosenClass:'mark-class'}">
      <transition-group name="cmps-list" tag="div" appear>
        <component v-for="(cmp, idx) in cmpsToDisplay" v-bind:is="cmp.type" :key="idx" :cmp="cmp" :isFirst="idx === 0" :isLast="idx === lastIdxCmps" class="border-default">
        </component>
      </transition-group>
    </draggable>
  
    <div class="btns-row" v-if="isLoading">
      <md-spinner md-indeterminate class="btns-row"></md-spinner>
    </div>
  
    <ul id="navs" data-open="close" data-close="open" @click="openArc">
  
      <li v-if="!isReturningUser" data-action="Start ">
        <md-button class="md-icon-button md-raised md-warn add-btn" id="custom" @click="getTemplate()">
          <md-icon>note_add</md-icon>
          <md-tooltip md-direction="top">Start from Template</md-tooltip>
        </md-button>
      </li>
      <li data-action="Reset All">
        <md-button
         class="md-icon-button md-raised md-warn" @click="resetAll">
          <md-icon>delete_forever</md-icon>
          <md-tooltip md-direction="top">Reset All</md-tooltip>
        </md-button>
      </li>
      <!--<li data-action="Create All">
        <md-button class="md-icon-button md-raised" @click="createAll">
          <md-icon>stars</md-icon>
          <md-tooltip md-direction="top">createAll</md-tooltip>
        </md-button>
      </li>-->
      <li data-action="Add New">
        <md-button class="md-icon-button md-raised md-primary add-btn" id="custom" @click="openDialog('addDialog')">
          <md-icon>add</md-icon>
          <md-tooltip md-direction="top">Add component</md-tooltip>
        </md-button>
      </li>
      <li data-action="Change Color">
        <md-button md-menu-trigger class="md-icon-button md-raised md-primary color-picker-btn">
          <md-icon>format_paint</md-icon>
          <color-picker :change="updateColor" @changeColor="changeCssProperty('backgroundColor',$event)"></color-picker>
          <md-tooltip md-direction="top">Change page background color</md-tooltip>
        </md-button>
      </li>
      <li data-action="Clear Color">
        <md-button class="md-icon-button md-raised md-primary" @click="changeCssProperty('backgroundColor','transparent')">
          <md-icon>format_clear</md-icon>
          <md-tooltip md-direction="top">Clear background color</md-tooltip>
        </md-button>
      </li>
  
    </ul>
    </div>
            <main-footer></main-footer>
  </section>
</template>

<script>

import MainFooter from './MainFooter'

import Draggable from 'vuedraggable'
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
    MainFooter,
    SimpleText,
    SimpleTitle,
    LocationMap,
    ImgCarousel,
    CoupleAbout,
    ImgTitle,
    Draggable,
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
    resetAll() {
      this.userToEdit.pageStyle = {};
      this.userToEdit.cmps = [];
      this.$store.dispatch({ type: 'resetAll', user: this.userToEdit })
    },
    getTemplate() {
      this.addNewCmp('SimpleTitle');
      this.addNewCmp('CoupleAbout');
      this.addNewCmp('SimpleText');
      this.addNewCmp('ImgCarousel');
      this.changeCssProperty('backgroundColor', 'hsl(36, 99.99999999999991%, 97%)');
    },
    createAll() {
      this.addNewCmp('SimpleTitle');
      this.addNewCmp('CoupleAbout');
      this.addNewCmp('SimpleText');
      this.addNewCmp('ImgCarousel');
      this.addNewCmp('ImgTitle');
      this.addNewCmp('LocationMap');
      this.addNewCmp('CountDown');
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
    },
    openArc(event) {
      let ul = event.target;
      let li = event.target.children;
      let i = li.length;
      let n = i - 1;
      let r = 200;
      event.target.classList.toggle('active')
      if (ul.classList.contains('active')) {
        for (var a = 0; a < i; a++) {
          li[a].style.visibility = 'initial'
          li[a].style.transitionDelay = `${(50 * a)}ms`
          li[a].style.left = (r * Math.cos(90 / n * a * (Math.PI / 180))) + 'px';
          li[a].style.top = (r * Math.sin(90 / n * a * (Math.PI / 180))) + 'px';
        }
      }
      else {
        for (var a = 0; a < i; a++) {
          li[a].style.visibility = 'hidden'
          li[a].removeAttribute('style')
        }
      }
    }
  }
}
</script>


<style lang="scss">
//in this css put only thing that are exclusive to PageEdit, and can be inheritted by other cmps

.height-container{
  min-height: 80vh;
}
.mark-class {
  border-color: #ff5722;
  z-index: 1;
}

.add-btn {
  // margin: 10px;
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

.md-tooltip {
  font-size: 16px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}



#navs {
  z-index: 999;
  position: fixed;
  left: 4px;
  top: 11vh;
  width: 60px;
  height: 60px;
  line-height: 40px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
  color: #fff;
  cursor: pointer;
  
  &::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    background-position: cover;
    background-color: #3f51b5;
  }
}

#navs>li,
#navs:after {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}

#nav , .active li::before{
      position: absolute;
      padding: 0;
      margin: 0;
    content: attr(data-action);
    white-space:nowrap;
    top: -27px;
    left:  10px;
    font-weight: bold;
        text-shadow: 0 4px white;

    // background: red;
    // border-radius: 2em;
}

#navs>li {
  transition: all .6s;
  -webkit-transition: all .6s;
  -moz-transition: .6s; // visibility: hidden;
  color: black;
  // &::before{
  //   position: absolute;
  //   content: attr(data-action);
  //   white-space:nowrap;
  //   top: -27px;
  //   left:  10px;
  // }
}

#navs:after {
  content: '';
  background-image: url('../assets/arc.svg'); 
  background-size: contain;
  z-index: 1;
  border-radius: 50%;
  -webkit-border-radius: 50%;
}

// #navs.active:after {
//   content: attr(data-open);
// }

#navs a {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  text-decoration: none;
  color: #fff;
  font-size: 0.8em;
}
</style>
