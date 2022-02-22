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
        settings
    </div>
</template>

<script>
export default {
    name: 'TimerSettingsCard',
    props: {
        userID: Number,
        timerCode: String
    }
}
</script>
