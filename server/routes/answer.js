const express = require('express')
const router = express.Router()
const Login = require('../middleware/checkLogin')
// const LoginDelete = require('../middleware/isLoginDelete')
const Answer = require('../controllers/answerController')

router.post('/', Login.isLogin, Answer.createAnswer)
router.get('/', Answer.findAllAnswer)
router.get('/:id', Answer.answerByid)
router.delete('/:id', Answer.destroyAnswer)
router.get('/questions/:id', Answer.answersByQuestion)
router.put('/:id', Answer.updateAnswer)
router.put('/vote/:id',  Login.isLogin, Answer.voteAnswer)

module.exports = router