<template>
    <div class="card timer-card">
        <div class="corner-buttons-container">
            <button
                v-if="userID"
                class="corner-button"
                @click="$emit('switch-card','TimerSettingsCard')"
            >
                <img class="corner-button-img" src="../assets/settings.png">
            </button>
            <button 
                class="corner-button"
                @click="$emit('switch-card','OpenTimerCard')"
            >
                <img class="corner-button-img" src="../assets/cancel.png">
            </button>
        </div>
        <p class="timer-title">
            {{timerName ? timerName : 'Timer'}}
        </p>
        <p class="input-description time-clock">
            {{ currentTimeString }}
        </p>
        <div class="sub-container">
            <div class="sub-content">
                <p class="input-description subs-count">{{timerSubs}}</p>
                <div class="sub-img-container">
                    <img src="../assets/user.png" alt="user" class="sub-img">
                </div>
            </div>
        </div>
        <div class="buttons timer-card-buttons">
            <template v-if="!userID">
                <button 
                    class="button link"
                    v-if="!userID"
                    @click="$emit('switch-card', 'SignInCard')"
                >
                    Вход
                </button>
                <button 
                    class="button link button__topmargin"
                    v-if="!userID"
                    @click="$emit('switch-card', 'SignUpCard')"
                >
                    Регистрация
                </button>
            </template>
            <template v-else>
                <div 
                    class="stop-reset-buttons"
                >
                    <button 
                        v-if="superUser" 
                        class="button button__bottommargin"
                        @click="stopTimer"
                    >
                        Пауза
                    </button>
                    <button 
                        v-if="superUser" 
                        class="button button__leftmargin button__bottommargin"
                    >
                        Перезапуск
                    </button>
                </div>
                <button 
                    v-if="userSubscribe" 
                    class="button sub-button"
                >
                    Отписаться
                </button>
                <button 
                    v-else 
                    class="button sub-button"
                >
                    Подписаться
                </button>
            </template>
        </div>
    </div>
</template>

<script>
import { getTimer } from '../api/timer.api'
import { formatTime } from '../services/timecard.service'
import { getTime } from '../services/timecard.service'

export default {
    name: 'TimerCard',
    props: {
        userID: Number,
        timerID: Number
    },
    data() {
        return {
            timerName : 'Timer',
            timerInterval: null,
            timerSubs: 0,
            currentTime : 0,
            userSubscribe: true,
            superUser: true
        }
    },
    methods: {
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.currentTime--
            }, 1000)
        },
        stopTimer() {
            clearTimeout(this.timerInterval)
        },
    },
    async mounted() {
        let data = await getTimer(this.timerID, this.userID);
        let timer = data.timer;
        this.timerName = timer.timer_name;
        this.startTimer();
        this.currentTime = getTime(timer);
    },
    watch : {
        currentTime(){
           if (this.currentTime === 0) {
                this.stopTimer();
           }
        }
    },
    computed : {
        currentTimeString() {
            return formatTime(this.currentTime) || 'Time is over';
        }
    }
}
</script>

<style scoped>
.timer-title{
    font-size: 32px;
    text-align: center;
    margin: 20px 0 0;
}
.input-description{
    text-align: center;
}
.time-clock{
    font-size: 32px;
}
.sub-img-container{
    width: 26px;
}
.sub-img{
    width: 100%;
}
.subs-count{
    font-size: 28px;
    line-height: 28px;
    width: fit-content;
    padding: 0 5px;
    margin: 0;
}
.sub-container{
    display: flex;
    justify-content: center;
}
.sub-content{
    display: flex;
    justify-content: center;
    min-width: 100px;
    padding: 3px 6px;
    border: 1px solid black;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, .4);
}
.buttons{
    margin: 20px 0 0;
    justify-content: center;
}
.sub-button{
    width: 306px;
}
.timer-card-buttons{
    flex-direction: column;
    align-items: center;
}
.stop-reset-buttons{
    display: flex;
    flex-direction: row;
}
</style>