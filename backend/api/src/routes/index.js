const express = require('express');
const router = express.Router();

const auth = require('./auth');
const courses = require('./courses');
const study = require('./study');
const gamify = require('./gamify');
const chat = require('./chat');
const admin = require('./admin');

router.use('/auth', auth);
router.use('/courses', courses);
router.use('/study', study);
router.use('/gamify', gamify);
router.use('/chat', chat);
router.use('/admin', admin);

module.exports = router;
