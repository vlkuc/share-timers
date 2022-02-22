<template>
  <div class="body-wrapper">
    <component 
        :is="currentCard"
        
        @switch-card="switchCard"
        @get-code="getCode"
        
        :userID="userID"
        :timerCode="timerCode"
    >
    </component>
    
    <timers-list 
        v-if='userID'
    />
</div>
</template>

<script>
import SignUpCard from './components/SignUpCard.vue'
import SignInCard from './components/SignInCard.vue'
import TimerSettingsCard from './components/TimerSettingsCard.vue'
import OpenTimerCard from './components/OpenTimerCard.vue'
import TimersList from './components/TimersList.vue'
import TimerCard from './components/TimerCard.vue'
import TimerCreateCard from './components/TimerCreateCard.vue'

export default{
  components: { 
    TimersList, 
    OpenTimerCard, 
    TimerCard,
    TimerSettingsCard,
    SignUpCard,
    SignInCard,
    TimerCreateCard
  },
  name: 'App',
  props: [

  ],
  data(){
    return{
        userID:  123,
        currentCard: 'OpenTimerCard',
        timerCode: '',
    }
  },
  methods : {
      switchCard(value = 'OpenTimerCard'){
          this.currentCard = value;
      },
      getCode(value){
          this.timerCode = value;
      }
  }
}
</script>


<style>
#app {
  max-width: 97vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.link{
  text-decoration: none;
}

.body-wrapper{
  width: 100%;

  box-sizing: border-box;
  padding: 20px;
  
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.card{
  position: relative;
  width: 100%;
  max-width: 460px;
  min-width: 440px;
  min-height: 65vh;

  margin: 0px 10px 20px;
  padding: 30px 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);
}

.input-wrapper{
  margin-bottom: 10px;
}

.input-description{
  width: 100%;

  font-size: 22px;

  padding: 0;
  margin: 20px 0;
}

.input-description-small{
  font-size: 18px;
  margin: 10px 0;
}

.default-input, select {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 18px;
}

.wrong-input{
  border: 1px solid rgb(211, 13, 13);
}

.input-error{
  color: rgb(211, 13, 13);
}

.default-input:focus{
  outline: none;
  border: 1px solid #4ca8af;
}

.buttons{
  display: flex;
  flex-direction: row;
}

.button {
  display: flex;
  justify-content: center;
  width: 150px;
  background-color: #4ca8af;
  color: white;
  padding: 14px 20px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.button__margin{
  margin: 6px;
}
.button__leftmargin{
  margin-left: 6px;
}
.button__bottommargin{
  margin-bottom: 6px;
}
.button__topmargin{
  margin-top: 6px;  
}

.button:hover {
  background-color: #4574a0;
}

.button:disabled{
  background-color: #b6cbdf;
}

.corner-buttons-container{
  position: absolute;
  top: 0;
  right: 0;
}
.corner-button{
  display: inline-block;
  padding: 6px;
  border: 1px solid black;
  width: 36px;
  height: 36px;
  box-sizing: border-box;

  margin: 3px;

  background-color: white;
  cursor: pointer;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, .4);
}

.corner-button:hover{
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, .7);
}

.corner-button:active{
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, .1);
}

.corner-button-img{
  width: 100%;
}
.switch-button{
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(31, 41, 63, 0.699);
  font: 14px sans-serif;
  text-align: left;
  text-decoration: none;
}
.switch-button:hover{
  color: rgb(10, 13, 41);
  text-decoration: underline;
}

p.switch-button{
  margin: 15px 0 0;
}

.reg-form > .buttons, .log-form > .buttons{
  flex-direction: column;
}
.reg-form > .buttons > .button{
  margin: 0
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance:textfield;
}
</style>
