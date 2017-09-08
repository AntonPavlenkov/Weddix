<template>
  <section class="img-carousel cmp-father" :class="{'mark-class':isEditMode}" :style="cmp.style">
    <div class="content">
      <carousel-3d>
        <slide v-for="(imgUrl, i) in cmp.data.imgUrls" :index="i" :key="i">
          <img :src="imgUrl" style='height: 100%; width: 100%;'>
        </slide>
      </carousel-3d>
    </div>

    <!--edit buttons-->
    <modify-btns @deleteCmp="deleteCmp" @toggleEditMode="toggleEditMode"></modify-btns>

    <transition name="fade">
      <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
        <carousel-toolbar :cmp="cmp" @update="updateCmp"></carousel-toolbar>
        <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
      </edit-console>
    </transition>

  </section>
</template>

<script>
import ModifyBtns from '../toolbars/ModifyBtns'
import GeneralEdit from '../toolbars/generalEditToolbar'
import CarouselToolbar from '../toolbars/CarouselToolbar'
import EditConsole from '../toolbars/EditConsole'
import { Carousel3d, Slide } from 'vue-carousel-3d';
import EditableFuncs from '../mixins/EditableFuncs'

export default {
  name: 'img-carousel',
  mixins: [EditableFuncs],
  props: {
    cmp: { type: Object, required: true },
    isFirst: Boolean, 
    isLast: Boolean
  },

  components: {
    'carousel-3d': Carousel3d,
    'slide': Slide,
    GeneralEdit,
    CarouselToolbar,
    EditConsole,
    ModifyBtns
  },
  methods: {
  }
}

</script>

<style scoped lang="scss">
.img-carousel {
  position: relative;
}

.edit-console {
  .urls-form {
    width: 100%;
    text-align: center;
  }
}
</style>
