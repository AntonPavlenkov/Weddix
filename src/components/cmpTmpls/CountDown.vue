<template>
    <section class="count-down" :style="cmp.style">
        <div class="content" >
        <div class="clock"></div>
	<div class="message"></div>
        
    
            <md-button class="md-fab edit-btn md-mini md-warn" @click="enterEditMode">
                <md-icon>edit</md-icon>
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
// import moment from 'moment'
var clock; 
		
export default {
    name: 'CountDown',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        GeneralEdit,
        Datepicker,
        
    },
    mounted(){
        this.clockInit()
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
        enterEditMode() {
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
            this.setDate = (date.setTime(time) - Date.now())/1000
            this.clockStart()
            console.log(time, date.setTime(time), this.setDate)
            
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
    margin: 5em 0;
    width: 100%;
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
