<template>
    <div class="wrapper">
        <p class="input-description">{{ title }}</p>
        <select v-model="accessMode" name="" id="" class="time-start default-input">
            <option value="all">Все</option>
            <option value="special">Определенные пользователи</option>
            <option value="nobody">Только я</option>
        </select>
        <template v-if="accessMode === 'special'">
            <input 
                type="text"
                placeholder="Укажите email пользователя..."  
                v-model="whoHasAccess" 
                :class="errorText ? 'default-input wrong-input' : 'default-input'"
            >
            <button
                class="button"
                @click="addUserWhoHasAccess"
            >
                Добавить пользователя
            </button>
            <p 
                class="input-error"
                v-if="errorText"
            >
                {{ errorText }}
            </p>
            <p>
                <span 
                    class="users-wcs"
                    v-for="(user, index) in whoHasAccessList" 
                    :key="user"
                > 
                    {{ user }} 
                    <span 
                        @click="whoHasAccessList.splice(index, 1)"
                    > x </span> 
                </span>
            </p>
        </template>
    </div>
</template>

<script>
export default{
    name: 'InputForList',
    props: {
        title: String,
    },
    emits: [
        'get-mode-and-list'
    ],
    data(){
        return{
            accessMode: 'all',
            whoHasAccess: '',
            whoHasAccessList: [],
            errorText: '',
        }
    },
    methods: {
        checkValidEmail(email){
            let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return re.test(String(email).toLowerCase());
        },
        addUserWhoHasAccess(){
            if (!this.whoHasAccessList.includes(this.whoHasAccess) 
            && this.checkValidEmail(this.whoHasAccess)){
                this.whoHasAccessList.push(this.whoHasAccess);
                this.whoHasAccess = '';
                this.errorText = '';
            } else if(this.checkValidEmail(this.whoHasAccess)){
                this.errorText = 'Данный пользователь уже добавлен в список';
            } else {
                this.errorText = 'Некорректный формат электронной почты';
            }
        },
        sendData(){
            this.$emit('get-list', this.whoHasAccess);
            this.$emit('get-mode', this.accessMode);
        }
    },
    watch: {
        whoHasAccessList: {
            handler(){
                this.$emit('get-mode-and-list', {
                    mode : this.accessMode,
                    usersList : this.whoHasAccessList
                });
            }, deep : true
        },
        accessMode() {
            this.$emit('get-mode-and-list', {
                mode : this.accessMode,
                usersList : this.whoHasAccessList
            });
        }
    }
}
</script>

<style scoped>
input[placeholder="Укажите email пользователя..."]{
    margin: 10px 0;
}
.users-wcs{
    display: inline-block;
    padding: 2px 4px;
    background-color: rgb(233, 233, 233);
    border-radius: 3px;
    margin: 3px;
    cursor: pointer;
}
.users-wcs > span {
    color: rgb(233, 233, 233);
}
.users-wcs:hover > span{
    color: red;
}
</style>