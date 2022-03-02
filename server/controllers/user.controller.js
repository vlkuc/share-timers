const db = require('../db');

class UserController {
    // Метод, реализующий регистрацию пользователя.
    async createUser(request, response){
        const {email, password} = request.body;
        const personWithSameEmail = await db.query(`SELECT id FROM person where email = $1`, [email]);

        if (personWithSameEmail.rowCount != 0){
            response.json(`email is busy`);
        } else {
            const newPerson = await db.query(`INSERT INTO person (email, pass) values ($1, $2) RETURNING *`, [email, password]); 
            response.json(newPerson.rows[0].id);
        }
    }
    // Метод, реализующий получение ID пользователя по его email'у и паролю.
    async getUser(request, response){
        const {email, password} = request.body;
        const newPerson = await db.query(`SELECT id FROM person where email = $1 and pass = $2`, [email, password]);

        if (newPerson.rowCount == 0){
            response.json(`wrong credits`);
        } else {
            response.json(newPerson.rows[0].id);
        }
    }
    // Метод, реализующий удаление пользователя по его id
    async deleteUser(request, response){
        const id = request.params.id;
        const newPerson = await db.query(`DELETE FROM person where id = $1`, [id]);
        response.json(newPerson.rows[0]);
    }
}

module.exports = new UserController();