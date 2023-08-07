import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { userValidation } from '../middlewares/validation.js'

export const authRoutes = () => {
  const authRouter = Router()
  const { login, register, refresh } = authController()

  authRouter.route('/auth/login')
    .post(login)

  authRouter.route('/auth/register')
    .post(userValidation, register)

  authRouter.route('/auth/refresh')
    .post(refresh)

  return authRouter
}
