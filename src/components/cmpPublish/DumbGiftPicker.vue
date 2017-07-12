<template>
    <section class="gift-picker cmp-father" :style="cmp.style">
        <span class="title">Gifts we want</span>
        <div class="content">
            <dumb-gift-card v-for="(gift, idx) in cmp.data.gifts" :key="idx" :gift="gift" :idx="idx" @updateGift="updateGift"></dumb-gift-card>
        </div>
    </section>
</template>

<script>
import DumbGiftCard from './DumbGiftCard'
export default {
    name: 'DumbGiftPicker',
    props: ['cmp'],
    components: {
      DumbGiftCard
    },
    data() {
        return {
            isEditMode: false,
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
    methods: {
        updateCmp(updatedCmp) {
            this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
        },
        updateGift(newGift, idx) {
            this.cmpToEdit.data.gifts.splice(idx, 1, newGift)
            this.updateCmp(this.cmpToEdit)
        },
    }
}
</script>


<style scoped>
.gift-picker {
    position: relative;
    transition: all .5s;
    padding: 30px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: center;
}

.content {
    /*margin: 0;*/
    padding: 0;
    line-height: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: space-between;
    transition: all 0.3s;
}

.container {
    position: relative;
}

.input-container {
    width: 200px;
    align-self: center;
}

.btn-add-gift {
    display: inline-block;
    align-self: center;
}

.gift-card,
.gift-card-imput {
    width: 250px;
    height: 150px;
    line-height: 40px;
    background-color: lightblue;
    margin: 10px 10px 10px 10px;
    cursor: pointer;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: center;
    position: relative;
    backface-visibility: hidden;
    transform-style: preserve3d;
    transition: all 0.4s;
    border-radius: 5px;
    border: solid lightgrey 1px;
}

.gift-card-imput {
    position: absolute;
    top: 0;
    left: 0;
}

.input {
    width: 80%;
    align-self: center;
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

.title {
    margin-bottom: 1em;
    font-size: 2em;
}
</style>
