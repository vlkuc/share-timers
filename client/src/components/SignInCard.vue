<template>
    <div class="card">
        <form class="log-form">
            <p class="input-description">Введите email</p>
            <div class="input-wrapper">
                <input 
                class="default-input" 
                type="text"
                >
                <p class="input-error"></p>
            </div>
            <p class="input-description">Введите пароль</p>
            <div class="input-wrapper">
                <input 
                class="default-input" 
                type="password"
                >
                <p class="input-error"></p>
            </div>
            
            <div class="buttons">
                <button
                    class="button"
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
export default {
    name: 'SignInCard',
    props: {

    }
}
</script>