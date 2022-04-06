export const formatTime = currentTime => {
    let resultStr = '';

    if (currentTime <= 0) {
        return 'Time is over';
    }

    let days = Math.floor(currentTime / 86400);
    resultStr = days === 0 ? resultStr : days + ':';

    let hours = Math.floor(currentTime / 3600) % 24;
    if (hours > 0){
        if (hours >= 10){
            resultStr = resultStr + hours + ':';
        } else {
            resultStr = resultStr === '' ? hours + ':' : resultStr + '0' + hours + ':';
        }
    } else if (resultStr !== '') {
        resultStr = resultStr + '00' + ':';
    }

    let minutes = Math.floor(currentTime / 60) % 60;
    if (minutes > 0){
        if (minutes >= 10){
            resultStr = resultStr + minutes + ':';
        } else {
            resultStr = resultStr === '' ? minutes + ':' : resultStr + '0' + minutes + ':';
        }
    } else if (resultStr !== '') {
        resultStr = resultStr + '00' + ':';
    }

    let seconds = currentTime % 60;
    if (seconds > 0){
        if (seconds >= 10){
            resultStr = resultStr + seconds;
        } else {
            resultStr = resultStr === '' ? seconds : resultStr + '0' + seconds;
        }
    } else if (resultStr !== '') {
        resultStr = resultStr + '00';
    }

    return resultStr;
}

export const getTime = timer => {
    if (timer.restart_auto) {
        return 100
    } else {
        let startTime = Number(timer.start_time);
        
        let circleTime = Number(timer.circle_time);
        
        let nowTime = new Date();
        nowTime = Math.round(nowTime.getTime() / 1000);

        return  circleTime + startTime - nowTime
    }
}