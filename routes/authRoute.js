const {Router} = require('express');
const router = Router();
const authController = require('../controller/authController')

router.get('/signup',authController.getSignup)
router.post('/signup',authController.postSignup)
router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)

module.exports=router;