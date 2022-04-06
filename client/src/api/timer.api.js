const axios = require('axios');
const SERVER_URL = 'http://localhost:8088/';

export async function createTimer(timer_name, start_time, circle_time, restart_auto, delay_time, seen_mode, user_id, permissions){
    let url = SERVER_URL + 'timer/create';

    return await axios.post(url, {
        timer_name, 
        start_time, 
        circle_time, 
        restart_auto, 
        delay_time, 
        seen_mode, 
        user_id, 
        permissions
    })
    .then(function (response) {
        return response.code
    })
}

export async function getTimerIdByCode(code){
    let url = SERVER_URL + `timer/getidbycode/${code}`;

    return await axios
    .get(url)
    .then(function (response) {
        return response.data.id
    })
}

export async function getTimer(timerID, userID){
    userID = userID == null ? -1 : userID;
    let url = SERVER_URL + `timer/gettimer/${timerID}/${userID}`;

    return await axios
    .get(url)
    .then(function (response) {
        return response.data
    })
}

export async function deleteTimer(timerID, userID){
    let url = SERVER_URL + `timer/delete`;

    return await axios.post(url, {
        timerID,
        userID
    })
    .then(function (response) {
        return response.code
    })
}