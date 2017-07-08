<template>
  <!--<h1>elad</h1>-->
  <section>
    <div class="content">
      <carousel-3d>
        <slide v-for="(imgUrl, i) in cmp.data.imgUrls" :index="i">
          <img :src="imgUrl" style='height: 100%; width: 100%;'>
        </slide>
      </carousel-3d>
      <md-button class="md-fab edit-btn md-mini md-warn" @click="enterEditMode">
        <md-icon>edit</md-icon>
      </md-button>
  
    </div>
    <transition name="fade">
      <div v-if="isEditMode" class="edit-console">
        <form novalidate @submit.stop.prevent="updateUrls" class="urls-form">
          <md-input-container v-for="(imgUrl, i) in cmpToEdit.data.imgUrls">
            <label>{{'img -' + (i+1)}}</label>
            <md-input :value="imgUrl"></md-input>
          </md-input-container>
  
          <md-button class="md-raised md-primary" @click="addPic">Add Pic</md-button>
          <md-button class="md-raised md-primary" type="submit">submit</md-button>
        </form>
  
        <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
      </div>
    </transition>
  
  </section>
</template>

<script>
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default {
  name: 'img-carousel',
  props: ['cmp', 'isFirst', 'isLast'],
  data() {
    return {
      isEditMode: false
    }
  },

  computed: {
    cmpToEdit() {
      return JSON.parse(JSON.stringify(this.cmp))
    }
  },

  components: { 'carousel-3d': Carousel3d, 'slide': Slide, TxtToolbar, GeneralEdit },
  methods: {
    moveCmp(isUp) {
      this.$store.dispatch({ type: "moveCmp", cmp: this.cmpToEdit, isUp });
    },
    deleteCmp() {
      this.isEditMode = false;
      this.$store.dispatch({ type: "deleteCmp", cmp: this.cmpToEdit });

    },
    enterEditMode() {
      this.isEditMode = !this.isEditMode
    },
    updateCmp(updatedCmp) {
      this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
    },
    updateColor: function (event) {
      this.color = event.color;
    },
    updateUrls(ev) {
      var elInputs = ev.target.querySelectorAll('input')
      elInputs.forEach(function (input, idx) {
        this.cmpToEdit.data.imgUrls[idx] = input.value;
      }, this);
      this.updateCmp(this.cmpToEdit)
    },
    addPic() {
      this.cmpToEdit.data.imgUrls.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HZTy2RjjHZcdM7yTCEfkDvwT6-GzlpA7R74GnbXkaqgfyiB5');
      this.updateCmp(this.cmpToEdit)
    }
  }
}

</script>

<style scoped lang="scss">
section {
  position: relative;
}

.edit-btn {
  position: absolute;
  left: 85%;
  top: 10%;
  opacity: 0.2;
  transition: all .5s;
}

.edit-btn:hover {
  opacity: 1;
  cursor: pointer;
}

.edit-console {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: space-between;
  /*top: 0;
    position: absolute;*/
  background: lightgray;
  /*width: 25%;
    z-index: 5;*/
  .urls-form {
    width: 100%;
    text-align: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}

.color-picker-btn {
  overflow: initial;
}
</style>
