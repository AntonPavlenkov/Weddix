<template>
    <section class="count-down border-default" :style="cmp.style" :class="{'mark-class': isEditMode}">
        <div class="content">
    
            <div class="calendar-date">
                <span class="day">{{this.day}}</span>
                <span class="month">{{this.month}}
                    <hr>
                </span>
                <span class="week-day">{{this.weekDay}}
                    <hr>
                </span>
                <span class="year">{{this.year}}
                    <hr>
                </span>
    
            </div>
    
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
            <md-button class="btn-modify btn-delete md-fab md-mini md-warn" @click="deleteCmp">
                <md-icon>delete_forever</md-icon>
                <md-tooltip md-direction="top">Delete</md-tooltip>
            </md-button>
    
        </div>
        <transition name="fade">
            <edit-console :cmp="cmp" v-if="isEditMode" @toggleEditMode="toggleEditMode" v-draggable>
                <datepicker :disabled="disabled" v-on:selected="setTimer" v-model="date"></datepicker>
                <general-edit :cmp="cmp" :isFirst="isFirst" :isLast="isLast" @delete="deleteCmp" @move="moveCmp" @update="updateCmp"></general-edit>
            </edit-console>
        </transition>
    </section>
</template>
  


<script>
import GeneralEdit from '../toolbars/generalEditToolbar'
import flipclock from '../../assets/Clock/flipclock.min.js'
import '../../assets/Clock/flipclock.css'
import Datepicker from 'vuejs-datepicker';
import EditConsole from '../toolbars/EditConsole';
var clock;

export default {
    name: 'CountDown',
    props: ['cmp', 'isFirst', 'isLast'],
    components: {
        GeneralEdit,
        Datepicker,
        EditConsole

    },
    created() {
    },
    mounted() {
        this.clockInit()
        this.setTimer(this.cmpToEdit.data.date)
    },
    data() {
        return {
            day: null,
            year: null,
            month: null,
            weekDay: null,
            isEditMode: false,
            color: "",
            date: new Date(),
            setDate: null,
            disabled: {
                to: new Date()
            }
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
        clockInit() {
            clock = $('.clock').FlipClock({
                clockFace: 'DailyCounter',
                autoStart: false,
                callbacks: {
                    stop: function () {
                        // $('.message').html('The clock has stopped!')
                    }
                }
            });
        },
        clockStart() {
            clock.setTime(this.setDate);
            clock.setCountdown(true);
            clock.start();
        },
        setTimer(time) {
            if (!time) return
            let date = new Date;
            this.cmpToEdit.data.date = date.setTime(time)
            let dateStr = new Date(this.cmpToEdit.data.date).toString()
            console.log(dateStr, typeof dateStr)

            this.weekDay = dateStr.slice(0, 3)
            this.month = dateStr.slice(4, 7)
            this.day = dateStr.slice(8, 10)
            this.year = dateStr.slice(11, 15)

            this.setDate = (date.setTime(time) - Date.now()) / 1000
            this.clockStart()
            this.updateCmp(this.cmpToEdit)

        }
    }
}
</script>


<style scoped>
hr {
    width: 80%;
}

.count-down {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    position: relative;
    transition: all .5s;
    width: 100%;
}

.content {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.clock {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
}

.calendar-date {
    display: flex;
    flex-flow: column wrap;
    width: 250px;
    height: 200px;
    font-family: Courgette;
}

.day {
    width: 40%;
    height: 100%;
    font-size: 7em;
    align-self: center;
    padding-top: 100px;
    color: goldenrod;
}

.month,
.year,
.week-day {
    width: 60%;
    height: 33%;
    text-align: center;
    padding-top: 20px;
    font-size: 2em;
    font-weight: bold;
}



/*.week-day{
    font-size: 
}*/

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

@media (max-width: 650px) {
    .count-down {
        display: inline-block;
        margin: 0;
        padding: 0;
    }
}
</style>
