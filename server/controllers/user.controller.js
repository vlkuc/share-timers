const db = require('../db');

let data = {
    error : '',
    personID : null
};

class UserController {
    // Метод, реализующий регистрацию пользователя.
    async createUser(req, res){
        const {email, password} = req.body;
        const personWithSameEmail = await db.query(`SELECT id FROM person where email = $1`, [email]);
        
        if (personWithSameEmail.rowCount != 0){
            data.error = 'Email занят!';
            data.personID = null;
        } else {
            const newPerson = await db.query(`INSERT INTO person (email, pass) values ($1, $2) RETURNING id`, [email, password]); 
            data.error = '';
            data.personID = newPerson.rows[0].id;
        }
        res.json(data);
    }
    // Метод, реализующий получение ID пользователя по его email'у и паролю.
    async getUser(request, res){
        const {email, password} = request.body;
        const person = await db.query(`SELECT id FROM person where email = $1 and pass = $2`, [email, password]);

        if (person.rowCount == 0){
            data.error = 'Неверный логин или пароль!';
            data.personID = null;
        } else {
            data.error = '';
            data.personID = person.rows[0].id;
        }

        res.json(data);
    }
    // Метод, реализующий удаление пользователя по его id
    async deleteUser(request, response){
        const id = request.params.id;
        const deletedPerson = await db.query(`DELETE FROM person where id = $1`, [id]);
        response.json(deletedPerson.rows[0]);
    }

    // Метод, реализующий получение подписок пользователя по его id
    async getSubscriptions(request, response){
        const id = request.params.id;
        let subscriptions = await db
            .query(
            `SELECT timer_id, timer_name FROM subscription
            INNER JOIN  timer ON timer.id = subscription.timer_id
            where subscription.user_id = $1`
            , [id]
        );

       let owntimers = await db
            .query(
            `SELECT id, timer_name FROM timer
            where user_id = $1`
            , [id]
        );
        
        response.json(owntimers.rows.concat(subscriptions.rows));

        }
}

module.exports = new UserController();