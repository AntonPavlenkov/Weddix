<template>
  <section class="img-carousel cmp-father" :style="cmp.style">
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
