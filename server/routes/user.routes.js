const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');

router.post('/create', userController.createUser);
router.post('/signin', userController.getUser);
router.get('/delete/:id', userController.deleteUser);

module.exports = router;