const express = require('express')
const router = express.Router()
const signIn = require('../functions/Authentication/Admin/signIn')
const signOut = require('../functions/Authentication/Admin/signOut')
const createAdmin = require('../functions/Authentication/Admin/createAdmin')
const updateRole = require('../functions/Authentication/Admin/changeRole')
const initialSuperAdmin = require('../functions/Authentication/Admin/initialCreate')
const insertIntoDictionary = require('../functions/content_insertion/dictionary')

//Authentication
router.post('/admin/login',signIn)
router.delete('/admin/logout',signOut)
router.post('/admin/create_admin',createAdmin)
router.patch('/admin/update_role',updateRole)
router.post('/admin/initial',initialSuperAdmin) //Somehow need to make it one time use

//Dictionary and content
router.post('/dictionary/insert',insertIntoDictionary)

module.exports = router
