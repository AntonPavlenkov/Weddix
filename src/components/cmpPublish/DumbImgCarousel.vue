<template>
  <section>
    <div class="content">
      <carousel-3d>
        <slide v-for="(imgUrl, i) in cmp.data.imgUrls" :index="i" :key="i">
          <img :src="imgUrl" style='height: 100%; width: 100%;'>
        </slide>
      </carousel-3d>
    </div>
  </section>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default {
  name: 'img-carousel',
  props: ['cmp'],
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
