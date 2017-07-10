<template>
    <section class="count-down border-default cmp-father" :style="cmp.style">
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
        </div>
    </section>
</template>
  


<script>
import flipclock from '../../assets/Clock/flipclock.min.js'
import '../../assets/Clock/flipclock.css'
var clock;

export default {
    name: 'CountDown',
    props: ['cmp'],
    components: {

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
            // this.updateCmp(this.cmpToEdit)

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
    /*justify-content: center;*/
    align-items: center;
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
