const db = require('../db');
const crypto = require('crypto');


class TimerController {
    // Метод, реализующий создание таймера
    async createTimer(request, response){
        const {timer_name, start_time, circle_time, restart_auto, delay_time, seen_mode, user_id, permissions} = request.body;
        let code = crypto.randomBytes(8).toString('hex');
        
        const NewTimer = await db.query(
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
        
        response.json(NewTimer.rows[0]);
    }
    // Метод, реализующий получение таймера по уникальному коду.
    async getTimerIdByCode(request, response){
        const timerCode = request.params.code;
        const timer = await db.query(`SELECT id FROM timer where code = $1`, [timerCode]);
        response.json(timer.rows[0]);
    }

    
    // Метод, реализующий получение таймера по ID.
    async getTimer(request, response){
        const timerID = request.params.timerid;
        const userID = request.params.userid;
        
        const timer = await db.query(`SELECT * FROM timer where id = $1`, [timerID]);

        if (userID != -1) {
            if (userID == timer.rows[0].user_id) {
                response.json(
                    {
                        error: false,
                        timer : timer.rows[0],
                        restart: true,
                        manage: true,
                        subscriber: true
                    }
                )
            } else {
                if ( timer.rows[0].seen_mode == 'nobody') {
                    response.json(
                        {
                            error: true,
                        }
                    )
                } else {
                    const managePermission = await db.query(`SELECT * FROM manage_permission WHERE timer_id = $1 AND user_id = $2`, [timerID, userID]);
                    const restartPermission = await db.query(`SELECT * FROM restart_permission WHERE timer_id = $1 AND user_id = $2`, [timerID, userID]);
                    const subscription = await db.query(`SELECT * FROM subscription WHERE timer_id = $1 AND user_id = $2`, [timerID, userID]);
                    
                    if ( timer.rows[0].seen_mode == 'all') {
                        response.json(
                            {
                                error: false,
                                timer : timer.rows[0],
                                restart: restartPermission.rows.length != 0,
                                manage: managePermission.rows.length != 0,
                                subscriber: subscription.rows.length != 0
                            }
                        )
                    } else {
                        const seenPermission = await db.query(`SELECT * FROM seen_permission WHERE user_id = $1 AND timer_idd = $2)`, [userID, timerID]);
                        
                        if (seenPermission.rows.length != 0){
                            response.json(
                                {
                                    error: false,
                                    timer : timer.rows[0],
                                    restart: restartPermission.rows[0].length != 0,
                                    manage: managePermission.rows[0].length != 0,
                                    subscriber: subscription.rows[0].length != 0
                                }
                            )
                        } else {
                            response.json(
                                {
                                    error: true,
                                }
                            )
                        }
                        
                    }
                }
            }
        } else {
            if(timer.rows[0].seen_mode == 'all'){
                response.json(
                    {
                        error: false,
                        timer : timer.rows[0],
                        restart: false,
                        manage: false,
                        subscriber: false
                    }
                )
            } else {
                response.json(
                    {
                        error: true,
                    }
                )
            }
        }


        
    }


    async updateTimer(request, response){

    }


    // Метод, реализующий удаление таймера по ID.
    async deleteTimer(request, response){
        const { timerID, userID }  = request.body;
        const message = {text: ''};

        let ownerID = await db.query(`SELECT user_id FROM timer where id = $1`, [timerID]);
        ownerID = ownerID.rows[0].user_id;

        let deletedTimer = {};
        let temp = {};
        if (ownerID == userID){
            deletedTimer = await db.query(`DELETE FROM timer where id = $1`, [timerID]);
            temp = await db.query(`DELETE FROM restart_permission where timer_id = $1`, [timerID]);
            temp = await db.query(`DELETE FROM seen_permission where timer_id = $1`, [timerID]);
            temp = await db.query(`DELETE FROM manage_permission where timer_id = $1`, [timerID]);
            temp = await db.query(`DELETE FROM subscription where timer_id = $1`, [timerID]);

            message.text = 'Timer was deleted';
        } else {
            message.text = 'No rights';
        }
        
        response.json(message);
    }
}

module.exports = new TimerController();