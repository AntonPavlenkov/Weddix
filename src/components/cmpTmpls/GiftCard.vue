<template>
<section @click.stop="toggleClass" class="container">
  
                <div :class="{ taken: giftToEdit.mail }" class="gift-card">{{giftToEdit.giftName}}</div>
                <div :class="{ taken: giftToEdit.mail }" class="gift-card-imput">
                    <span v-if="!giftToEdit.mail">
                    Enter your e-mail for approving gift
                    </span>
                    <span v-if="giftToEdit.mail">
                        This gift is already taken
                    </span>
                    <md-input-container v-if="!giftToEdit.mail" class="input">
                        <label></label>
                        <md-input  v-model="giftToEdit.mail"></md-input>
                    </md-input-container>
                        <md-button class="aprove-btn" v-if="!giftToEdit.mail" @click.stop="updateGift(giftToEdit)">Aprove</md-button>
                </div>
           

</section>
</template>

<script>
export default {
props:['gift', 'idx'],
created(){
    console.log(this.gift, this.idx)
},
computed: {
        giftToEdit() {
            return JSON.parse(JSON.stringify(this.gift))
        }
},
methods:{
    updateGift(updatedGift) {
        
            this.$emit('updateGift', this.giftToEdit, this.idx )
        },
        toggleClass(event) {
            event.target.parentElement.classList.toggle('flipped')
        }
}
}
</script>

<style scoped>

.container {
    position: relative;
    
}



.gift-card,
.gift-card-imput {
    z-index: 1;
    width: 250px;
    line-height: 40px;
    background-color: lightblue;
    margin: 10px 10px 10px 10px;
    cursor: pointer;
    display: block;
    text-align: center;
    position: relative;
    backface-visibility: hidden;
    transform-style: preserve3d;
    transition: all 0.4s;
    border-radius: 5px;
    border: solid lightgrey 1px;
}
.taken{
    background-color: lightgreen;
}

.gift-card-imput {
    position: absolute;
    z-index: 4;
    top: 0;
    left: 0;
}
.input{
    width: 80%;
    margin: 0 auto;
    text-align: center;
}



.gift-card-imput {
    transform: rotateY(-180deg);
}

.flipped >.gift-card-imput {
    transform: rotateY(0deg);
}

.flipped >.gift-card {
    transform: rotateY(180deg);
}

.title {
    margin-bottom: 5em;
}

.aprove-btn{
    display: inline-block;
    width: 90%;
}
  
</style>
