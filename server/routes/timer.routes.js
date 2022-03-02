const Router = require('express');
const router = new Router();
const timerController = require('../controllers/timer.controller');

router.post('/create', timerController.createTimer);
router.get('/getbyid/:id', timerController.getTimerById);
router.get('/getbycode/:code', timerController.getTimerByCode);
router.get('/delete/:id', timerController.deleteTimer);

module.exports = router;