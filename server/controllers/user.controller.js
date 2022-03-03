const db = require('../db');

class UserController {
    // Метод, реализующий регистрацию пользователя.
    async createUser(req, res){
        const {email, password} = req.body;
        const personWithSameEmail = await db.query(`SELECT id FROM person where email = $1`, [email]);

        if (personWithSameEmail.rowCount != 0){
            res.json(`email is busy`);
        } else {
            const newPerson = await db.query(`INSERT INTO person (email, pass) values ($1, $2) RETURNING *`, [email, password]); 
            res.json(newPerson.rows[0].id);
        }
    }
    // Метод, реализующий получение ID пользователя по его email'у и паролю.
    async getUser(request, res){
        res.set('Content-Type', 'application/json');
        res.set('status', 200);

        const {email, password} = request.body;
        const person = await db.query(`SELECT id FROM person where email = $1 and pass = $2`, [email, password]);

        let data = {
            error : '',
            personID : null
        };

        if (person.rowCount == 0){
            data.error = 'wrong credits';
        } else {
            data.personID = person.rows[0].id;
        }

        res.json(data);
    }
    // Метод, реализующий удаление пользователя по его id
    async deleteUser(request, response){
        const id = request.params.id;
        const newPerson = await db.query(`DELETE FROM person where id = $1`, [id]);
        response.json(newPerson.rows[0]);
    }
}

module.exports = new UserController();