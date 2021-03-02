const express = require('express')
const router = express.Router()
const signIn = require('../functions/Authentication/Admin/signIn')
const signOut = require('../functions/Authentication/Admin/signOut')
const createAdmin = require('../functions/Authentication/Admin/createAdmin')
const updateRole = require('../functions/Authentication/Admin/changeRole')
const initialSuperAdmin = require('../functions/Authentication/Admin/initialCreate')
const insertIntoDictionary = require('../functions/content/dictionary/insert')
const dumpDictionary = require('../functions/content/dictionary/deleteAll')
const FBinsert = require('../functions/content/fill_in_the_blanks/insert')
const FBupdate = require('../functions/content/fill_in_the_blanks/edit')
const FBdelete = require('../functions/content/fill_in_the_blanks/delete')

//Authentication
router.post('/admin/login',signIn)
router.delete('/admin/logout',signOut)
router.post('/admin/create_admin',createAdmin)
router.patch('/admin/update_role',updateRole)
router.post('/admin/initial',initialSuperAdmin) //Somehow need to make it one time use

//Dictionary and content

//---Dictionary
router.post('/dictionary/insert',insertIntoDictionary)
router.delete('/dictionary/deleteAll',dumpDictionary)

//---Fill in the blanks
router.post('/content/fill_in_the_blanks/insert',FBinsert)
router.patch('/content/fill_in_the_blanks/update',FBupdate)
router.delete('/content/fill_in_the_blanks/delete',FBdelete)

module.exports = router
