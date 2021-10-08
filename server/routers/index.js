const express = require('express');

const controller = require('../controllers/index');

const router = express.Router();



router.get('/api/token',controller.getToken);

router.get('/api/calendar',controller.getCalendar);

router.get('/api/service',controller.getService);

router.get('/api/serviceAd',controller.getServiceAd);

router.get('/api/design',controller.getDesign);

router.post('/api/userService',controller.userService);

router.post('/api/logout',(req,res) => {
        console.log(req.body)
        res.send('total');
})

router.post('/api/singin',controller.singin);

router.post('/api/singup',controller.singup);

router.get('/api/user',controller.user);

module.exports = router;