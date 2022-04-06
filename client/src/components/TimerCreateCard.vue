<template>
    <div class="card">
        <div class="corner-buttons-container">
            <button
                class="corner-button"
                @click="$emit('switch-card','OpenTimerCard')"
            >                
                <img class="corner-button-img" src="../assets/cancel.png">
            </button>
        </div>
        <p class="input-description">Название таймера</p>
        <div class="input-wrapper">
            <input 
                class="default-input"
                type="text"
                v-model="timerName"
                maxlength="20"
            >
            <p 
                v-if="!timerName"
                class="input-error"
            >Обязательное поле</p>
        </div>

        <p class="input-description">Время старта</p>
        <div class="time-inputs-wrapper">
            <input 
                type="text" 
                maxlength="2" 
                v-model="hour" 
                class="time-input default-input"
                @blur="hour = hour.length < 2 ? '0' + hour : hour"
            >
            <p>:</p>
            <input 
                type="text" 
                maxlength="2" 
                v-model="minute" 
                class="time-input default-input"
                @blur="minute = minute.length < 2 ? '0' + minute : minute"
            >
            <select v-model="dayIs" name="" id="" class="time-start default-input">
                <option :value="true">Сегодня</option>
                <option :value="false">В другой день</option>
            </select>
        </div>

        <template v-if="!dayIs" >
            <p class="input-description-small">Дата запуска</p>
            <div class="time-inputs-wrapper">
                <select
                    v-model="day" 
                    class="time-input default-input"
                >
                    <option 
                        :value="index"
                        v-for="index in numberOfDays"
                        :key="index"
                    >
                        {{index}}
                    </option>
                </select>
                <p>.</p>
                <select
                    v-model="month" 
                    class="time-input default-input"
                >
                    <option 
                        :value="index < 10 ? index : index"
                        v-for="index in 12"
                        :key="index"
                    >
                        {{index}}
                    </option>
                </select>
                <select
                    v-model="year" 
                    class="time-start default-input"
                >
                    <option 
                        :value="year + index - 1"
                        v-for="index in 5"
                        :key="index"
                    >
                        {{ year + index - 1}}
                    </option>
                </select>
            </div>
        </template>

        <p class="input-description">Время работы</p>
        <div class="time-inputs-wrapper">
            <input 
                type="text" 
                maxlength="3" 
                v-model="workDays" 
                class="time-input default-input"
            >
            <p>д.</p>
            <input 
                type="text" 
                maxlength="2" 
                v-model="workHours" 
                class="time-input default-input"
            >
            <p>ч.</p>
            <input 
                type="text" 
                maxlength="2" 
                v-model="workMinutes" 
                class="time-input default-input"
            >
            <p>м.</p>
        </div>

        <p class="input-description">Повторный запуск</p>
        <select v-model="restartAuto" name="" id="" class="time-start default-input">
            <option :value="true">Автоматически</option>
            <option :value="false">Вручную</option>
        </select>

        <template v-if="restartAuto">
            <p class="input-description-small">Время перед повторным запуском</p>
            <div class="time-inputs-wrapper">
                <input 
                    type="text" 
                    maxlength="2" 
                    v-model="restartHours" 
                    class="time-input default-input"
                >
                <p>ч.</p>
                <input 
                    type="text" 
                    maxlength="2" 
                    v-model="restartMinutes" 
                    class="time-input default-input"
                >
                <p>м.</p>
            </div>
        </template>

        <input-for-list 
            title="Кто может видеть таймер"
            @get-list="value => whoCanSee = value"
            @get-mode="value => seenMode = value"
        />

        <input-for-list 
            title="Кто может перезапускать таймер"
            @get-list="value => whoCanRestart = value"
        />

        <input-for-list 
            title="Кто может изменять настройки таймера"
            @get-list="value => whoCanManage = value"
        />

        <button
            class="button button__topmargin"
            @click="create"
        > 
            Создать
        </button>
        <p v-if="errorText" class="input-error">
            {{ errorText }}
        </p>
    </div>
</template>

<script>
import { createTimer } from '../api/timer.api'
import { getTimerIdByCode } from '../api/timer.api'
import InputForList from './InputForList.vue'
export default {
    components: { InputForList },
    name: 'TimerCreateCard',
    props: {
        userID: Number,
    },
    data(){
        return{
            errorText: '',
            timerName: '',
            hour: 0,
            minute : 0,
            day: 1,
            month: 1,
            year: 2022,
            dayIs: true,
            workDays: 0,
            workHours: 0,
            workMinutes: 0,
            restartAuto: false,
            restartHours: 0,
            restartMinutes: 0,
            seenMode: 'all',
            whoCanSee: [],
            whoCanManage: [],
            whoCanRestart: [],
        }
    },
    methods : {
        async create(){
            if (this.timerName == ''){
                this.errorText = 'Введите название таймера';
                return
            }
            if (this.workDays == 0 && this.workHours == 0 && this.workMinutes == 0){
                this.errorText = 'Введите время работы таймера';
                return
            }

            let startTime = new Date(this.year, this.month, this.day, this.hour, this.minute);
            startTime = startTime.getTime() / 1000;

            let circleTime = this.workDays*86400 + this.workHours*3600 + this.workMinutes*60;

            let delayTime = 0;
            if (this.restartAuto){
                delayTime = this.restartHours*3600 + this.restartMinutes*60;
            }

            let permissions = {
                whoCanSee : this.whoCanSee,
                whoCanManage : this.whoCanManage,
                whoCanRestart : this.whoCanRestart
            }

            let response = await createTimer(
                this.timerName, 
                startTime, 
                circleTime, 
                this.restartAuto, 
                delayTime, 
                this.seenMode,
                this.userID,
                permissions
            );

            this.$emit('get-timerid',  response);
            this.$emit('switch-card', 'TimerCard');
        }
    },
    computed : {
        numberOfDays() {
            switch(this.month){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    return 31
                case 2:
                    if (this.year % 4 === 0 && this.year % 100 !== 0 || this.year % 400 === 0) return 29
                    return 28
                default:
                    return 30    
            }
        },
    },
    watch: {
        timerName(){
            this.errorText = '';
        },
        hour(){
            if (this.hour > 23) this.hour = 23;
            if (this.hour < 0) this.hour = 0;
        },
        minute(){
            if (this.minute > 59) this.minute = 59;
            if (this.minute < 0) this.minute = 0;
        },
        workDays(){
            this.errorText = '';
        },
        workHours(){
            if (this.workHours > 23) {
                this.workDays = Math.floor(this.workHours / 24);   
                this.workHours = this.workHours - this.workDays*24;
            }
            if (this.workHours < 0) this.workHours = 0;
            this.errorText = '';
        },
        workMinutes(){
            if (this.workMinutes > 59) {
                this.workHours = Math.floor(this.workMinutes / 60);
                this.workMinutes = this.workMinutes - this.workHours*60;
            }
            if (this.workMinutes < 0) this.workMinutes = 0;
            this.errorText = '';
        }
    },
    mounted () {
        let now = new Date();
        this.hour = now.getHours();
        this.minute = now.getMinutes();
        this.day = now.getDate();
        this.month = now.getMonth();
        this.year = now.getFullYear();
    }
}
</script>

<style scoped>


.time-input{
    min-width: 70px;
    max-width: 70px;
    padding: 0px 10px;
    margin: 0 5px;
    text-align: center;
	-moz-appearance: none;
	-webkit-appearance: none;
}
.time-input::-ms-expand {
	display: none;
}

.time-start{
    min-height: 56px;
}

.time-inputs-wrapper{
    display: flex;
    flex-direction: row;
    margin: 3px 0;
}

.time-inputs-wrapper > p {
    font-size: 18px;
    text-align: center;
}

.time-inputs-wrapper .time-input:first-child{
    margin: 0 5px 0 0;
}
</style>