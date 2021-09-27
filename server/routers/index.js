const express = require('express');

const controller = require('../controllers/index');

const csurf = require('csurf');

const router = express.Router();

const csurfProtection = csurf({cookie:true});

router.get('/api/token',csurfProtection,controller.getToken);

module.exports = router;