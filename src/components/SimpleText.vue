<template>
<section class="simple-text">
    <div class="content" :style="cmpToEdit.style">
    <span :contenteditable="isEditMode">{{cmpToEdit.data}}</span>
    <br>
    <span :contenteditable="isEditMode"> Hello world </span>

    




    <button class="edit-btn" @click="enterEditMode">EDIT</button>
    </div>
   <transition name="fade">
    <div v-if="isEditMode" class="edit-console">
         <txt-toolbar :cmp="cmp" @updateStyle="updateNewStyle"></txt-toolbar>
         I AM EDIT CONSOLE 
        <button @click="changeBgColor()">change bg color</button>
    </div>
   </transition>
  </section>
</template>

<script>
import TxtToolbar from './txtToolbar/TxtToolbar'
export default {
  name: 'SimpleText',
  props:['cmp'],
components:{
    TxtToolbar
  },
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
          console.log(this.cmpToEdit.style,'THIS IS STYLE OF SIMPLE TEXT')
        //    this.cmpToEdit.data="kkk";
          this.updateCmp();
      },
      changeStyleAtt(){

      },
      updateCmp(){
           this.$store.dispatch({type:"updateCmp", cmp:this.cmpToEdit});
      },
      updateNewStyle(cmpWithNewStyle){
          console.log(cmpWithNewStyle)
          this.cmpToEdit = cmpWithNewStyle
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
    transition: all .5s;
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
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: space-between;
    /*top: 0;
    position: absolute;*/
    background: red;
    height: 100px;
    /*width: 25%;
    z-index: 5;*/
    
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
