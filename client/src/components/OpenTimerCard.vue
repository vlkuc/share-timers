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
          @focus="codeError = false"
        >
        <p 
          v-if="inputChecked && timerCode.length !== 16"
          class="input-error"
        >Длина кода должна быть 16 символов.</p>
        <p v-if="codeError" class="input-error">
          Таймер ненайден!
        </p>
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
import {getTimerIdByCode} from '../api/timer.api'
export default {
  name: 'OpenTimerCard',
  props: {
    userID: Number,
  },
  data(){
    return{
      timerCode: '',
      inputChecked: false,
      codeError: false
    }
  },
  methods : {
    async useCode(){
      let timerID = await getTimerIdByCode(this.timerCode);

      if (timerID !== undefined){
        this.$emit('get-timerid', timerID);
        this.$emit('switch-card','TimerCard');
      } else {
        this.codeError = true;
      }
    }
  }
}
</script>


<style scoped>
.card{
  justify-content: space-between;
}
</style>
