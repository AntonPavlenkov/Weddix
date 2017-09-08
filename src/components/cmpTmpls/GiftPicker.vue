<template>
    <section class="gift-picker cmp-father" :style="cmp.style" :class="{'mark-class': isEditMode,'first':isFirst}">
        <span class="title">Gifts we want</span>
    
        <div class="content">
            <gift-card v-for="(gift, idx) in cmp.data.gifts" :key="idx" :gift="gift" :idx="idx" @updateGift="updateGift"></gift-card>
        </div>
    

    
        <md-input-container v-if="isEditMode" class="input-container">
            <label>name new gift</label>
            <md-input  v-model="nameNewGift" maxlength="15"></md-input>
        </md-input-container>
        <md-button v-if="isEditMode" @click="addNewGift" class="md-icon-button md-raised btn-add-gift">
            <md-icon>add</md-icon>
        </md-button>
    
        <!--edit buttons-->
    
        <modify-btns @deleteCmp="deleteCmp" @toggleEditMode="toggleEditMode"></modify-btns>
    
        <transition name="fade">
            <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
                <txt-toolbar :cmp="cmp" @update="updateCmp"></txt-toolbar>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </edit-console>
        </transition>
    </section>
</template>

<script>
import ModifyBtns from '../toolbars/ModifyBtns'
import TxtToolbar from '../toolbars/TxtToolbar'
import GeneralEdit from '../toolbars/generalEditToolbar'
import EditConsole from '../toolbars/EditConsole'
import GiftCard from './GiftCard'
import EditableFuncs from '../mixins/EditableFuncs'
export default {
    name: 'GiftPicker',
    mixins: [EditableFuncs],
    props: {
        cmp: { type: Object, required: true },
        isFirst: Boolean , isLast: Boolean
    },
    components: {
        ModifyBtns,
        TxtToolbar,
        GeneralEdit,
        EditConsole,
        GiftCard
    },
    data() {
        return {
            color: "",
            nameNewGift: ''
        }
    },
    methods: {
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

.first {
    /*margin-top: 0;*/
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s!important;
}

.fade-enter,
.fade-leave-to {
    opacity: 0!important;
}
</style>
