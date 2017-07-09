<template>
    <section class="gift-picker" :style="cmp.style" :class="{'mark-class': isEditMode}">
        <span class="title">Gifts we want</span>
        <div class="content">
            <gift-card v-for="(gift, idx) in cmp.data.gifts" :key="idx" :gift="gift" :idx="idx" @updateGift="updateGift"></gift-card>
        </div>
        <md-input-container class="input-container">
            <label>name new gift</label>
            <md-textarea v-model="nameNewGift"></md-textarea>
        </md-input-container>
        <md-button @click="addNewGift" class="md-icon-button md-raised btn-add-gift">
  <md-icon>add</md-icon>
</md-button>
    
        <!--edit buttons-->
    
        <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="toggleEditMode">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button>
        <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
            <md-tooltip md-direction="top">Reorder</md-tooltip>
        </md-button>
    
        <transition name="fade">
            <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
                <txt-toolbar :cmp="cmp" @update="updateCmp"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </edit-console>
        </transition>
    </section>
</template>

<script>
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'
import EditConsole from '../toolbars/EditConsole'
import GiftCard from './GiftCard'
export default {
    name: 'GiftPicker',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        TxtToolbar,
        GeneralEdit,
        EditConsole,
        GiftCard
    },
    data() {
        return {
            isEditMode: false,
            color: "",
            nameNewGift: ''
        }
    },
    computed: {
        cmpToEdit() {
            return JSON.parse(JSON.stringify(this.cmp))
        }
    },
    methods: {
        moveCmp(isUp) {
            this.$store.dispatch({ type: "moveCmp", cmp: this.cmpToEdit, isUp });
        },
        deleteCmp() {
            this.isEditMode = false;
            this.$store.dispatch({ type: "deleteCmp", cmp: this.cmpToEdit });
        },
        toggleEditMode() {
            this.isEditMode = !this.isEditMode
        },
        updateCmp(updatedCmp) {
            this.$store.dispatch({ type: "updateCmp", cmp: updatedCmp });
        },
        updateGift(newGift, idx) {
            this.cmpToEdit.data.gifts.splice(idx, 1, newGift)


            this.updateCmp(this.cmpToEdit)

        },
        addNewGift() {
            let newGift = { giftName: this.nameNewGift, mail: '' }
            this.cmpToEdit.data.gifts.push(newGift)
            this.updateCmp(this.cmpToEdit)
        }
    }
}
</script>


<style scoped>
.gift-picker {
    position: relative;
    margin: 15px 0;
    transition: all .5s;
    padding: 30px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
}

.content {
    margin: 0;
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
    order: 99;
}

.btn-add-gift {
    order: 100;
    display: block;
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
    margin: 0 auto;
    text-align: center;
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
    margin-bottom: 5em;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>
