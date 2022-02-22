<template>
  <div class="card add-timer">
    <div class="content-wrapper">
      <p class="input-description">Найти таймер с помощью кода</p>
      <div class="input-wrapper">
        <input 
        :class="inputChecked && timerCode.length !== 16 ? 'default-input wrong-input' : 'default-input'"
        type="text"
        v-model="timerCode"
        @blur="inputChecked = true"
        >
        <p 
          v-if="inputChecked && timerCode.length !== 16"
          class="input-error"
        >Длина кода должна быть 16 символов.</p>
      </div>
      <div class="buttons">
        <button
          class="button"
          :disabled="timerCode.length !== 16"
          @click="useCode"
        >
          Найти таймер
        </button>
      </div>
    </div>

    <div class="content-wrapper">
      <p class="input-description">Создать таймер</p>
      <p v-if="!userID" class="input-description-small">
        Для создания таймера необходимо войти в учетную запись
      </p>
      <div class="buttons">
        <button 
          class="button link"
          v-if="userID"
          @click="$emit('switch-card', 'TimerCreateCard')"
        >
          Создать
        </button>
        
        <button 
          class="button link"
          v-if="!userID"
          @click="$emit('switch-card', 'SignInCard')"
        >
          Вход
        </button>
        <button 
          class="button link button__leftmargin"
          v-if="!userID"
          @click="$emit('switch-card', 'SignUpCard')"
        >
          Регистрация
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenTimerCard',
  props: {
    userID: Number,
  },
  data(){
    return{
      timerCode: '',
      inputChecked: false,
    }
  },
  methods : {
    useCode(){
      this.$emit('get-code', this.timerCode);
      this.$emit('switch-card','TimerCard');
    }
  }
}
</script>


<style scoped>
.card{
  justify-content: space-between;
}
</style>
