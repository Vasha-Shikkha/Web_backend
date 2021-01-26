const express = require('express')
const router = express.Router()
const database = require('../utils/database/database')
const registration = require('../functions/Authentication/registration')
const signIn = require('../functions/Authentication/signIn')
const signOut = require('../functions/Authentication/signOut')
const findMcq = require('../functions/tasks/mcq/mcq')

//Authentication
router.post('/user/register',registration)
router.post('/user/login',signIn)
router.delete('/user/logout',signOut)

//Tasks
router.get('/user/task/mcq',findMcq)

module.exports = router
