const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')

router.get('/', loginController.getRegister)
router.get('/login', loginController.getLogin)
router.post('/checkUsers', loginController.checkUsers)
router.post('/add_User', loginController.addUser)

module.exports = router