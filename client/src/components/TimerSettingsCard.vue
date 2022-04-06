<template>
    <div class="card">
        <div class="corner-buttons-container">
            <button 
                class="corner-button"
                @click="$emit('switch-card','TimerCard')"
            >
                <img class="corner-button-img" src="../assets/cancel.png">
            </button>
        </div>
        <button 
            v-if="userID == timer.user_id" 
            class="button delete-button"
            @click="deleteTimer"
        >
            Удалить таймер
        </button>
    </div>
</template>

<script>
import { getTimer } from '../api/timer.api'
import { deleteTimer } from '../api/timer.api'
export default {
    name: 'TimerSettingsCard',
    props: {
        userID: Number,
        timerID: Number
    },
    data(){
        return {
            timer : {},
        }
    },
    async mounted() {
        let data = await getTimer(this.timerID, this.userID);
        this.timer = data.timer;
    },
    methods : {
        async deleteTimer(){
            let res = await deleteTimer(this.timerID, this.userID);
            
            this.$emit('switch-card', 'OpenTimerCard');
        }
    },
}
</script>
