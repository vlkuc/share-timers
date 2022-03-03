<template>
    <div class="card">
        <form class="log-form">
            <p class="input-description">Введите email</p>
            <div class="input-wrapper">
                <input 
                class="default-input" 
                type="text"
                v-model="email"
                >
                <p class="input-error"></p>
            </div>
            <p class="input-description">Введите пароль</p>
            <div class="input-wrapper">
                <input 
                class="default-input" 
                type="password"
                v-model="password"
                >
                <p class="input-error"></p>
            </div>
            
            <div class="buttons">
                <div
                    class="button"
                    @click="logIn"
                >
                    Войти
                </div>
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
export default {
    name: 'SignInCard',
    data(){
        return{
            email: '',
            password: '',
        }
    },
    methods: { 
        async logIn(){
            await signIn(this.email, this.password);
        }
    }
}
</script>