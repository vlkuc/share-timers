<template>
    <div class="card">
        <form class="reg-form">
            <p class="input-description">Введите email</p>
            <div class="input-wrapper">
                <input 
                    v-model="email"
                    :class="emailErorr ? 'wrong-input default-input' : 'default-input'" 
                    type="text"
                    @blur="checkEmail"
                >
                <p v-if="emailErorr" class="input-error">{{ emailErorr }}</p>
            </div>
            <p class="input-description">Введите пароль</p>
            <div class="input-wrapper">
                <input 
                    v-model="password"
                    :class="passwordErorr ? 'wrong-input default-input' : 'default-input'" 
                    type="password"
                    @blur="checkPassword"
                >
            </div>
            <p class="input-description">Повторите пароль</p>
            <div class="input-wrapper">
                <input 
                    v-model="passwordRepit"
                    :class="passwordErorr ? 'wrong-input default-input' : 'default-input'" 
                    type="password"
                    @blur="checkRepitPassword"
                >
                <p v-if="passwordErorr" class="input-error">{{ passwordErorr }}</p>
            </div>
            
            <div class="buttons">
                <button
                    class="button"
                    @click="signUp"
                >
                    Отправить
                </button>
                <p 
                    class="switch-button link"
                    @click="$emit('switch-card', 'SignInCard')"
                >
                    Войти
                </p>
                <p 
                    class="switch-button link"
                    @click="$emit('switch-card', 'OpenTimerCard')"
                >
                    Использовать без авторизации
                </p>
            </div>
        </form>
    </div>
</template>

<script>
import { signUp } from '../api/user.api'
import { checkValidEmail } from '../services/common.service'

export default {
    name: 'SignUpCard',
    data(){
        return{
            email: '',
            password: '',
            passwordRepit: '',
            passwordErorr: '',
            emailErorr: '',
        }
    },
    methods: {
        checkEmail(event){
            if (!checkValidEmail(this.email)){
                event.target.focus();
                this.emailErorr = 'Неверный формат электронной почты';
            }
        },
        checkPassword(event){
            if (this.password.length < 12){
                event.target.focus();
                this.passwordErorr = 'Минимальная длина пароля 12 символов';
            }
        },
        checkRepitPassword(){
            if (this.passwordRepit != this.password){
                this.passwordErorr = 'Пароли не совпадают';
            }
        },
        async signUp(event){
            event.preventDefault();
            if (!this.emailErorr && !this.passwordErorr){
                let loginData = await signUp(this.email, this.password);
                if (loginData.error){
                    this.emailErorr = loginData.error; 
                } else {
                    this.$emit('get-userid', loginData.personID);
                    this.$emit('switch-card', 'OpenTimerCard');
                }
            }
        },
    },
    watch: {
        password(){
            this.passwordErorr = '';
        },
        email(){
            this.emailErorr = '';
        }
    }
}
</script>