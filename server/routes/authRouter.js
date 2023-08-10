import Router from "express"
const router = new Router()
import controller from '../controllers/authController.js'
import { check } from "express-validator"

router.post('/register', [
    check('username', 'Username cant be an empty value').isLength({min: 4, max: 10}),
    check('email', 'invalid Email').notEmpty(),
    check('password', 'Password length must not be more than 10 and not less than 4 characters').isLength({min: 4, max: 10}),
], controller.register)
router.post('/login', controller.login)
router.post('/Glogin', controller.loginGoogle)
router.get('/users', controller.getUsers)

export default router;