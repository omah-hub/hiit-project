const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)
router.get('/', user.getProfile)
router.get('/name', user.getName)
router.get('/books', user.getBooks)

module.exports = router