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

export async function getSubscriptions(userID){
    let url = SERVER_URL + `user/subscriptions/${userID}`;

    return await axios
        .get(url)
        .then(function (response) {
            return response.data
        })
}