const router = require('express').Router()
const { login, register } = require('./controllers/patientAuth/authController')

router.post('/register', login)
router.post('/authenticate', register)

module.exports = router
