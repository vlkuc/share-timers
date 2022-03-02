const db = require('../db');
const crypto = require('crypto');


class TimerController {
    // Метод, реализующий создание таймера
    async createTimer(request, response){
        const {timer_name, start_time, circle_time, restart_auto, delay_time, seen_mode, user_id} = request.body;

        do {
            const code = crypto.randomBytes(8).toString('hex');
            const timerWithSameCode = await db.query(`SELECT id FROM timer where code = $1`, [code]);
        } while(timerWithSameCode.rowCount == 0);

        const newTimer = await db.query(`INSERT INTO timer (code, timer_name, ) values ($1, $2) RETURNING *`, [code,]); 
        response.json(timerWithSameCode);
    }
    // Метод, реализующий получение таймера по ID.
    async getTimerByCode(request, response){
        const timerID = request.params.id;
        const timer = await db.query(`SELECT * FROM timer where id = $1`, [timerID]);
    }
    async getTimerById(request, response){
        const timerID = request.params.id;
        const timer = await db.query(`SELECT * FROM timer where id = $1`, [timerID]);
    }
    // Метод, реализующий удаление таймера по ID.
    async deleteTimer(request, response){
        const id = request.params.id;
        const newPerson = await db.query(`DELETE FROM person where id = $1`, [id]);
        response.json(newPerson.rows[0]);
    }
}

module.exports = new TimerController();