<template>
    <section @click.stop="toggleClass" class="container">
    
        <div :class="{ taken: giftToEdit.mail }" class="gift-card front">{{giftToEdit.giftName}}</div>
        <div :class="{ taken: giftToEdit.mail }" class="gift-card-imput back">
            <span v-if="!giftToEdit.mail">
                Insert e-mail
            </span>
            <span v-if="giftToEdit.mail">
                Taken
            </span>
            <md-input-container v-if="!giftToEdit.mail" class="input">
                <label>Enter Email</label>
                <md-input class="mail-input" v-model="giftToEdit.mail"></md-input>
            </md-input-container>
            <md-button class="aprove-btn" v-if="!giftToEdit.mail" @click.stop="updateGift(giftToEdit)">Aprove</md-button>
        </div>
    
    </section>
</template>

<script>
export default {
    props: ['gift', 'idx'],
    name: 'DumbGiftCard',
    created() {
        console.log(this.gift, this.idx)
    },
    computed: {
        giftToEdit() {
            return JSON.parse(JSON.stringify(this.gift))
        }
    },
    methods: {
        updateGift(updatedGift) {

            this.$emit('updateGift', this.giftToEdit, this.idx)
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
    width: 100px;
    height: 170px;
    line-height: 40px;
    margin: 10px 10px 25px 10px;
    cursor: pointer;
    display: block;
    text-align: center;
    position: relative;
    backface-visibility: hidden;
    transform-style: preserve3d;
    transition: all 0.4s;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center 55%;
    text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
}

.taken {}

.gift-card {
    background-image: url(../../assets/opened.png)
}

.gift-card-imput {
    position: absolute;
    z-index: 4;
    top: 0;
    left: 0;
    background-image: url(../../assets/closed.png)
}

.input {
    position: absolute;
    top: 80%;
    width: 100%;
    margin: 0 auto;
    text-align: center;
}

.aprove-btn {
    position: absolute;
    top: 107%;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
}

.gift-card-imput {
    transform: rotateY(-180deg);
}

.flipped>.gift-card-imput {
    transform: rotateY(0deg);
}

.flipped>.gift-card {
    transform: rotateY(180deg);
}
</style>
