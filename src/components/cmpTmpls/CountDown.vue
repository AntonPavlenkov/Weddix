<template>
    <section class="count-down" :style="cmp.style">
        <div class="content" >
        <div class="clock"></div>
	<div class="message"></div>
        
    
        <md-button class="btn-modify btn-edit md-fab md-mini md-warn" @click="toggleEditMode">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Edit</md-tooltip>
        </md-button>
        <md-button class="btn-modify btn-dragndrop md-fab md-mini md-warn">
            <md-icon>swap_vertical_circle</md-icon>
            <md-tooltip md-direction="top">Reorder</md-tooltip>
        </md-button>
    
        </div>
        <transition name="fade">
            <div v-if="isEditMode" class="edit-console" v-draggable>
            <datepicker :disabled="disabled" v-on:selected="setTimer" v-model="date"></datepicker>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </div>
        </transition>
    </section>
</template>
  


<script>
import GeneralEdit from '../toolbars/generalEditToolbar'
import flipclock from '../../assets/Clock/flipclock.min.js'
import  '../../assets/Clock/flipclock.css'
import Datepicker from 'vuejs-datepicker';
var clock; 
		
export default {
    name: 'CountDown',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        GeneralEdit,
        Datepicker,
        
    },
    created(){
    },
    mounted(){
        this.clockInit()
        this.setTimer(this.cmpToEdit.data.date)
    },
    data() {
        return {
            isEditMode: false,
            color: "",
            date: new Date(),
            setDate: null,
            disabled: {
            to: new Date()}
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
        clockInit(){
            clock = $('.clock').FlipClock({
		        clockFace: 'DailyCounter',
		        autoStart: false,
		        callbacks: {
		        	stop: function() {
		        		// $('.message').html('The clock has stopped!')
		        	}
		        }
		    });
        },
        clockStart(){
            clock.setTime(this.setDate);
		    clock.setCountdown(true);
		    clock.start();
        },
        setTimer(time){
            let date = new Date;
            if(!time) return
            this.cmpToEdit.data.date = date.setTime(time);
            this.setDate = (date.setTime(time) - Date.now())/1000
            this.clockStart()
            this.updateCmp(this.cmpToEdit)
            
        }
    }
}
</script>


<style scoped>
.count-down {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    position: relative;
    transition: all .5s;

    width: 100%;
}
.clock{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    justify-content: center;
    margin: 5em 0;
    width: 100%;
}
section.count-down.cmps-enter-to > li.flip-clock-before{
    position: initial;
}
.flip-clock-wrapper ul li a {
    display: initial;
}
p{
    margin: 0;
    padding: 0;
}

.edit-btn {
    position: absolute;
    left: 85%;
    top: 10%;
    opacity: 0.2;
    transition: all .5s;
}

.edit-btn:hover {
    opacity: 1;
    cursor: pointer;
}



.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
    opacity: 0
}

.color-picker-btn {
    overflow: initial;
}
</style>
