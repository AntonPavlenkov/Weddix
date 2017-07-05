<template>
  <section class="text-toolbar  md-mini">
    <md-button class="md-fab md-clean  md-mini">
      <md-icon>text_format</md-icon>
      <md-tooltip md-direction="top">Choose text format</md-tooltip>
    </md-button>
  
    <md-button @click="changeAlign('right')" class="md-fab md-clean md-mini">
      <md-icon>format_align_right</md-icon>
      <md-tooltip md-direction="top">Text align right</md-tooltip>
    </md-button>
  
    <md-button @click="changeAlign('center')" class="md-fab md-clean  md-mini">
      <md-icon>format_align_center</md-icon>
      <md-tooltip md-direction="top">Text align center</md-tooltip>
    </md-button>
  
    <md-button @click="changeAlign('left')" class="md-fab md-clean  md-mini">
      <md-icon>format_align_left</md-icon>
      <md-tooltip md-direction="top">Text align left</md-tooltip>
    </md-button>
  
    <md-button @click="changeBold" class="md-fab md-clean  md-mini">
      <md-icon>format_bold</md-icon>
      <md-tooltip md-direction="top">Bold text</md-tooltip>
    </md-button>
  
    <md-button md-menu-trigger class="md-fab md-clean  md-mini color-picker-btn">
      <md-icon>format_color_fill</md-icon>
      <color-picker :change="updateColor" @changeColor="changeFontColor"></color-picker>
      <md-tooltip md-direction="top">Change color of the text</md-tooltip>
    </md-button>
  
    <md-menu md-align-trigger>
      <md-button md-menu-trigger class="md-fab md-clean  md-mini">
        <md-icon>format_size</md-icon>
        <md-tooltip md-direction="top">Change text size</md-tooltip>
      </md-button>
      <md-menu-content>
        <md-menu-item>12px</md-menu-item>
        <md-menu-item>16px</md-menu-item>
        <md-menu-item>18px</md-menu-item>
        <md-menu-item>20px</md-menu-item>
        <md-menu-item>22px</md-menu-item>
        <md-menu-item>24px</md-menu-item>
      </md-menu-content>
    </md-menu>
  
    <!--<color-picker :change="updateColor"></color-picker>-->
  
  </section>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  name: 'ToolBar',
  props: ['cmp'],
  components: { 'color-picker': ColorPicker },
  created() {
    this.cmpStyleEdit = JSON.parse(JSON.stringify(this.cmp));
  },
  data() {
    return {
      cmpStyleEdit: null,
      color: ""

    }
  },
  methods: {
    changeAlign(dir) {
      this.cmpStyleEdit.style.textAlign = dir;
      this.$emit('updateStyle', this.cmpStyleEdit)

    },
    changeBold() {
      if (this.cmpStyleEdit.style.fontWeight === 'normal')
        this.cmpStyleEdit.style.fontWeight = 'bold';
      else {
        this.cmpStyleEdit.style.fontWeight = 'normal';
      }
      this.$emit('updateStyle', this.cmpStyleEdit)
    },
    updateColor: function (event) {
      this.color = event.color;
    },

    changeFontColor(newColor) {
      this.cmpStyleEdit.style.color = newColor;
      this.$emit('updateStyle', this.cmpStyleEdit)

    }


  }
}
</script>


<style scoped>
.text-toolbar {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
}

.c1 {
  background-color: white;
  width: 100%;
  text-align: center;
}

.c2 {
  background-color: red;
  width: 100%;
  text-align: center;
}

.c3 {
  background-color: green;
  width: 100%;
  text-align: center;
  font-weight: normal
}

.color-picker-btn {
  overflow: initial;
}
</style>
