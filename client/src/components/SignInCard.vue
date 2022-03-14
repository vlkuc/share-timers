<template>
    <div class="card">
        <form class="log-form">
            <p class="input-description">Введите email</p>
            <div class="input-wrapper">
                <input 
                    class="default-input" 
                    type="text"
                    v-model="email"
                    @blur="checkEmail"
                >
                <p v-if="emailErorr" class="input-error">
                    Неверный формат электронной почты
                </p>
            </div>
            <p class="input-description">Введите пароль</p>
            <div class="input-wrapper">
                <input 
                    class="default-input" 
                    type="password"
                    v-model="password"
                    @blur="checkPassword"
                >
                <p v-if="passwordErorr" class="input-error">
                    {{ passwordErorr }}
                </p>
            </div>
            
            <div class="buttons">
                <button
                    class="button"
                    @click="logIn"
                >
                    Войти
                </button>
                <p 
                    class="switch-button link"
                    @click="$emit('switch-card', 'SignUpCard')"
                >
                    Регистрация
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
import { signIn } from '../api'
import { checkValidEmail } from '../services/common.service'
export default {
    name: 'SignInCard',
    data(){
        return{
            email: '',
            password: '',
            emailErorr: false,
            passwordErorr: false,
        }
    },
    methods: { 
        checkEmail(event){
            if (!checkValidEmail(this.email)){
                event.target.focus();
                this.emailErorr = true;
            }
        },
        checkPassword(event){
            if (this.password == ''){
                event.target.focus();
                this.passwordErorr = 'Введите пароль';
            }
        },
        async logIn(event){
            event.preventDefault();
            if (!this.emailErorr && !this.passwordErorr){
                let loginData = await signIn(this.email, this.password);
                if (loginData.error){
                    this.passwordErorr = 'Неверный email или пароль'; 
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
            this.emailErorr = false;
        }
    }
}
</script>