import { Router } from 'express'
import { getProfile, login, register } from '../controllers/user-controller.js'
import { loginUser, registerUser } from '../lib/middlewares/validators.js'
import { authMiddleware } from '../lib/middlewares/authMiddleware.js'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

router.post('/register', registerUser, register)

router.post('/login', loginUser, login)

router.get('/profile', authMiddleware, getProfile)

// router.get('/logout', authMiddleware.authUser, userController.logoutUser)

export const userRouter = router
