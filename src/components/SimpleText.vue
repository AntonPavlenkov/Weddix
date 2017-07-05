<template>
<section class="simple-text">
    <div class="content" :style="cmpToEdit.style">
    <span :contenteditable="isEditMode">{{cmpToEdit.data}}</span>
    <br>
    <span :contenteditable="isEditMode"> Hello world </span>

    




    <button class="edit-btn" @click="enterEditMode">EDIT</button>
    </div>
   <transition>
    <div v-if="isEditMode" class="edit-console"> I AM EDIT CONSOLE 
        <button @click="changeBgColor()">change bg color</button>
    </div>
   </transition>
  </section>
</template>

<script>
export default {
  name: 'SimpleText',
  props:['cmp'],
  data () {
    return {   
      isEditMode: false,
      cmpToEdit: null
   
    }
  },
  created(){
       this.cmpToEdit = JSON.parse(JSON.stringify(this.cmp));
  },
  methods:{
      enterEditMode(){
          this.isEditMode = true
          console.log('Entering Edit MOde')

      },
      changeBgColor(){
          console.log('cmpToEdit',this.cmpToEdit)
          var newBgColor = prompt('enter new color');
          this.cmpToEdit.style.backgroundColor = newBgColor;
          console.log('cmpToEdit',this.cmpToEdit);
           this.cmpToEdit.data="kkk";
        //   this.updateCmp();
      },
      changeStyleAtt(){

      },
      updateCmp(){
           this.$store.dispatch({type:"updateCmp", cmp:this.cmpToEdit});
      }
  },
//   watch:{
//       cmpToEdit: {
//         handler: function(newValue) {
//             console.log('in handler');
//             this.$store.dispatch({type:"updateCmp", cmp:this.cmpToEdit})
//         },
//         deep: true           
//       }
//   }
}
</script>


<style scoped>
.simple-text{
    transition: all .5s;
    background-color: lightgreen;
    position: relative;
    /*width: 100%;*/
    margin-top: 5px;
}
.content{
    height: 100px;
}
p{
     margin: 0;
    padding: 0;
}
.edit-btn{
    position: absolute;
    left: 85%;
    opacity: .5;
}
.edit-btn:hover{
    opacity: 1;
    cursor: pointer;
}
.edit-console{
    /*top: 0;
    position: absolute;*/
    background: red;
    height: 100px;
    /*width: 25%;
    z-index: 5;*/
    
}
</style>
