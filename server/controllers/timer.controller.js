const db = require('../db');
const crypto = require('crypto');


class TimerController {
    // Метод, реализующий создание таймера
    async createTimer(request, response){
        const {timer_name, start_time, circle_time, restart_auto, delay_time, seen_mode, user_id, permissions} = request.body;
        const timerWithSameCode = undefined;

        do {
            const code = crypto.randomBytes(8).toString('hex');
            timerWithSameCode = await db.query(`SELECT id FROM timer where code = $1`, [code]);
        } while(timerWithSameCode.rowCount === 0);
        
        const IDOfNewTimer = await db.query(
            `INSERT INTO timer (code, timer_name, start_time, circle_time, restart_auto, delay_time, seen_mode, user_id)
            values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`, 
            [code, timer_name, start_time, circle_time, restart_auto, delay_time, seen_mode, user_id]
        ); 
         
        if (seen_mode === 'special'){
            permissions.whoCanSee.forEach(async user_email => {
                let user_id = await db.query(`SELECT id FROM person where email = $1`, [user_email]);
                let newPermission = await db.query(`INSERT INTO seen_permission (user_id, timer_id) values ($1, $2)`, [user_id, IDOfNewTimer]);
            });
        }

        if (permissions.whoCanManage.length !== 0){
            permissions.whoCanManage.forEach(async user_email => {
                let user_id = await db.query(`SELECT id FROM person where email = $1`, [user_email]);
                let newPermission = await db.query(`INSERT INTO manage_permission (user_id, timer_id) values ($1, $2)`, [user_id, IDOfNewTimer]);
            });
        }

        if (permissions.whoCanRestart.length !== 0){
            permissions.whoCanRestart.forEach(async user_email => {
                let user_id = await db.query(`SELECT id FROM person where email = $1`, [user_email]);
                let newPermission = await db.query(`INSERT INTO restart_permission (user_id, timer_id) values ($1, $2)`, [user_id, IDOfNewTimer]);
            });
        }
        
        response.json(IDOfNewTimer);
    }
    // Метод, реализующий получение таймера по уникальному коду.
    async getTimerByCode(request, response){
        const timerCode = request.params.code;
        const timer = await db.query(`SELECT * FROM timer where code = $1`, [timerCode]);
        response.json(timer);
    }
    // Метод, реализующий получение таймера по ID.
    async getTimerById(request, response){
        const timerID = request.params.id;
        const timer = await db.query(`SELECT * FROM timer where id = $1`, [timerID]);
        response.json(timer);
    }
    async updateTimer(request, response){

    }
    // Метод, реализующий удаление таймера по ID.
    async deleteTimer(request, response){
        const timerID = request.params.id;
        const deletedTimer = await db.query(`DELETE FROM timer where id = $1`, [timerID]);
        response.json(deletedTimer);
    }
}

module.exports = new TimerController();