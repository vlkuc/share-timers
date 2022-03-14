const axios = require('axios');
const SERVER_URL = 'http://localhost:8088/';

// Отправляем запрос с целью получения идентификатора пользователя
export async function signIn(email, password){
    let url = SERVER_URL + 'user/signin';

    return await axios.post(url, {
        email,
        password
    })
    .then(function (response) {
        return response.data
    })
}

// Отправляем запрос с целью создания новой учетной записи и получения ее идентификатора
export async function signUp(email, password){
    let url = SERVER_URL + 'user/create';

    return await axios.post(url, {
        email,
        password
    })
    .then(function (response) {
        return response.data
    })
}

// Отправляем запрос на создание нового таймера
export async function createTimer(){
    
}



const getIdbyCode = code => {
    let id = code;
    return id;
};

export async function getTimerById(id){
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(
            {
                name: id,
                time: 65,
                subs: 999,
            }
        ), 2000)
    });

    let result = await promise;

    return result    
};

export async function getTimerByCode(code){
    let id = getIdbyCode(code);
    return await getTimerById(id);
};