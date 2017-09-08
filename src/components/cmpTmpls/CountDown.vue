<template>
    <section class="count-down border-default cmp-father" :style="cmp.style" :class="{'mark-class': isEditMode}">

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
            <div class="clock-area">
                <div class="clock"></div>
            </div>
            <!--<div class="message"></div>-->
            <modify-btns @deleteCmp="deleteCmp" @toggleEditMode="toggleEditMode"></modify-btns>
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
import ModifyBtns from '../toolbars/ModifyBtns'
import GeneralEdit from '../toolbars/generalEditToolbar'
import flipclock from '../../assets/Clock/flipclock.min.js'
import '../../assets/Clock/flipclock.css'
import Datepicker from 'vuejs-datepicker';
import EditConsole from '../toolbars/EditConsole';
import EditableFuncs from '../mixins/EditableFuncs'

var clock;

export default {
    name: 'CountDown',
    mixins: [EditableFuncs],
    props: {
        cmp: { type: Object, required: true },
        isFirst: Boolean, 
        isLast: Boolean
    },
    components: {
        GeneralEdit,
        Datepicker,
        EditConsole,
        ModifyBtns
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
            color: "",
            date: new Date(),
            setDate: null,
            disabled: {
                to: new Date()
            }
        }
    },
    methods: {
        clockInit() {
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.clock {
    position: relative;
    left: -20px;
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

@media (max-width: 650px) {
    .count-down {
        display: inline-block;
        margin: 0;
        padding: 0;
    }
}





/*this meadia query was added by kerendot*/

@media (max-width: 680px) {
    .content {
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
    }
}
</style>
