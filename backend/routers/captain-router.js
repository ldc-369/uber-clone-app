import { Router } from 'express'
import { loginCaptain, registerCaptain } from '../lib/middlewares/validators.js'
import {
  getProfile,
  login,
  register
} from '../controllers/captain-controller.js'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

router.post('/register', registerCaptain, register)

router.post('/login', loginCaptain, login)

// middleware
router.get('/profile', getProfile)

// router.get(
//     '/logout',
//     authMiddleware.authCaptain,
//     captainController.logoutCaptain
//   )

export const captainRouter = router
