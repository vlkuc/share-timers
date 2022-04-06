const Router = require('express');
const router = new Router();
const timerController = require('../controllers/timer.controller');

router.post('/create', timerController.createTimer);
router.get('/gettimer/:timerid/:userid', timerController.getTimer);
router.get('/getidbycode/:code', timerController.getTimerIdByCode);
router.post('/delete', timerController.deleteTimer);

module.exports = router;