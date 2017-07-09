<template>
  <!--<h1>elad</h1>-->
  <section class="img-carousel" :class="{'mark-class':isEditMode}">
    <div class="content">
      <carousel-3d>
        <slide v-for="(imgUrl, i) in cmp.data.imgUrls" :index="i" :key="i">
          <img :src="imgUrl" style='height: 100%; width: 100%;'>
        </slide>
      </carousel-3d>
    </div>
  
    <!--edit buttons-->
    <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="toggleEditMode">
      <md-icon>edit</md-icon>
    </md-button>
    <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
      <md-icon>swap_vertical_circle</md-icon>
    </md-button>
  
    <transition name="fade">
      <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
        <carousel-toolbar :cmp="cmp" @update="updateCmp"></carousel-toolbar>
        <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
      </edit-console>
    </transition>
  
  </section>
</template>

<script>
import GeneralEdit from '../toolbars/generalEditToolbar'
import CarouselToolbar from '../toolbars/CarouselToolbar'
import EditConsole from '../toolbars/EditConsole'
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

  components: { 
    'carousel-3d': Carousel3d, 
    'slide': Slide, 
    GeneralEdit,
    CarouselToolbar,
    EditConsole
  },
  methods: {
    moveCmp(isUp) {
      this.$store.dispatch({ type: "moveCmp", cmp: this.cmpToEdit, isUp });
    },
    deleteCmp() {
      this.isEditMode = false;
      this.$store.dispatch({ type: "deleteCmp", cmp: this.cmpToEdit });

    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode
    },
    updateCmp(updatedCmp) {
      this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
    },
  }
}

</script>

<style scoped lang="scss">
.img-carousel {
  transition: all .5s;
  position: relative;
  width: 100%;
}

.edit-console {
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
.fade-leave-to {
  opacity: 0
}
</style>
