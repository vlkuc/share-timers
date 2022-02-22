<template>
    <div class="card">
        <form class="reg-form">
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
            <p class="input-description">Повторите пароль</p>
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
export default {
    name: 'SignUpCard',
    props: {

    }
}
</script>