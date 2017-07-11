<template>
  <section class="text-toolbar  md-mini">
        <md-button md-menu-trigger class="md-fab md-clean  md-mini color-picker-btn">
      <md-icon>format_color_fill</md-icon>
      <color-picker :change="updateColor" @changeColor="changeCssProperty('color', $event)"></color-picker>
      <md-tooltip md-direction="top">Change color of the text</md-tooltip>
    </md-button>
    <md-menu md-align-trigger>
      <md-button md-menu-trigger class="md-fab md-clean  md-mini">
        <md-icon>text_format</md-icon>
        <md-tooltip md-direction="top">Choose text format</md-tooltip>
      </md-button>
      <md-menu-content>
        <!--<md-menu-item class="font-shadows" @click="changeCssProperty('fontFamily','Shadows Into Light')">Shadows Into Light</md-menu-item>-->
        <md-menu-item class="font-dancing" @click="changeCssProperty('fontFamily','Dancing Script')">Dancing Script</md-menu-item>
        <md-menu-item class="font-rouge" @click="changeCssProperty('fontFamily','Rouge Script')">Rouge Script</md-menu-item>
        <md-menu-item class="font-courgette" @click="changeCssProperty('fontFamily','Courgette')">Courgette</md-menu-item>
        <md-menu-item class="font-handlee" @click="changeCssProperty('fontFamily','Handlee')">Handlee</md-menu-item>
        <!--<md-menu-item class="font-cursive" @click="changeCssProperty('fontFamily','cursive')">Cursive</md-menu-item>-->
        <md-menu-item class="font-average" @click="changeCssProperty('fontFamily','Average')">Average</md-menu-item>
        <md-menu-item class="font-montserrat" @click="changeCssProperty('fontFamily','Montserrat')">Montserrat</md-menu-item>
        <!--<md-menu-item @click="changeCssProperty('fontFamily','fantasy')">Fantasy</md-menu-item>-->
        <!--<md-menu-item @click="changeCssProperty('fontFamily','Arial, Helvetica, sans-serif')">Arial sans-serif</md-menu-item>-->
        <!--<md-menu-item @click="changeCssProperty('fontFamily','monospace')">Monospace</md-menu-item>-->
      </md-menu-content>
    </md-menu>
  
    <md-button @click="changeCssProperty('textAlign','left')" class="md-fab md-clean  md-mini">
      <md-icon>format_align_left</md-icon>
      <md-tooltip md-direction="top">Text align left</md-tooltip>
    </md-button>
  
    <md-button @click="changeCssProperty('textAlign','center')" class="md-fab md-clean  md-mini">
      <md-icon>format_align_center</md-icon>
      <md-tooltip md-direction="top">Text align center</md-tooltip>
    </md-button>
  
    <md-button @click="changeCssProperty('textAlign','right')" class="md-fab md-clean md-mini">
      <md-icon>format_align_right</md-icon>
      <md-tooltip md-direction="top">Text align right</md-tooltip>
    </md-button>
    <md-button @click="changeBold" class="md-fab md-clean  md-mini">
      <md-icon>format_bold</md-icon>
      <md-tooltip md-direction="top">Bold text</md-tooltip>
    </md-button>
  
    <md-menu md-align-trigger>
      <md-button md-menu-trigger class="md-fab md-clean  md-mini">
        <md-icon>format_size</md-icon>
        <md-tooltip md-direction="top">Change text size</md-tooltip>
      </md-button>
      <md-menu-content>
        <input type="range" @mousedown.stop min="12" max="90" @input="changeFOntSize" :value="fontSizeInputRangeValue">
      </md-menu-content>
    </md-menu>
  
  </section>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  name: 'ToolBar',
  props: ['cmp'],
  components: { 'color-picker': ColorPicker },
  computed: {
    cmpStyleEdit() {
      return JSON.parse(JSON.stringify(this.cmp))
    },
    fontSizeInputRangeValue() {
      var currentFontSizeValue = this.cmp.style.fontSize
      // cut the px from the end of the value
      return +currentFontSizeValue.substring(0, currentFontSizeValue.indexOf("px"));
    }
  },
  data() {
    return {
      color: ""

    }
  },
  methods: {
    changeBold() {
      // this.cmpStyleEdit = JSON.parse(JSON.stringify(this.cmp));
      if (this.cmpStyleEdit.style.fontWeight === 'normal')
        this.cmpStyleEdit.style.fontWeight = 'bold';
      else {
        this.cmpStyleEdit.style.fontWeight = 'normal';
      }
      this.$emit('update', this.cmpStyleEdit)
    },

    updateColor: function (event) {
      // this.cmpStyleEdit = JSON.parse(JSON.stringify(this.cmp));
      this.color = event.color;
    },

    changeCssProperty(prop, val) {
      this.cmpStyleEdit.style[prop] = val;
      this.$emit('update', this.cmpStyleEdit)
    },
    changeFOntSize() {
      this.changeCssProperty('fontSize', event.target.value + 'px ')
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

.md-menu-content {
  min-height: 0;
}

.font-shadows {
  font-family: 'Shadows Into Light', cursive;
}

.font-rouge {
  font-family: 'Rouge Script', cursive;
}

.font-dancing {
  font-family: 'Dancing Script', cursive;
}

.font-courgette {
  font-family: 'Courgette', cursive;
}

.font-handlee {
  font-family: 'Handlee', cursive;
}

.font-cursive {
  font-family: cursive;
}

.font-average {
  font-family: Average;
}

.font-montserrat {
  font-family: Montserrat;
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
}

.color-picker-btn {
  overflow: initial;
}
</style>
