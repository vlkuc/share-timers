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
        const newPerson = await db.query(`DELETE FROM person where id = $1`, [id]);
        response.json(newPerson.rows[0]);
    }
}

module.exports = new UserController();