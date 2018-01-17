const express = require('express')
const router = express.Router()
const Login = require('../middleware/checkLogin')
// const LoginDelete = require('../middleware/isLoginDelete')
const Question = require('../controllers/questionController')

router.post('/', Login.isLogin, Question.createQuestion)
router.get('/', Question.findAllQuestion)
router.get('/:id', Login.isLogin, Question.questionsByid)
router.get('/author/:id', Question.questionsByAuthorid)
router.put('/:id',Login.isLogin, Question.updateQuestion)
router.delete('/:id', Login.isLogin,Question.destroyQuestions)
router.put('/vote/:id', Login.isLogin, Question.voteQuestion)

module.exports = router