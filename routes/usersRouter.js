import { Router } from 'express'
import { usersController } from '../controllers/usersController.js'
import { userParamsValidation, userValidation } from '../middlewares/validation.js'

export const usersRoutes = () => {
  const usersRouter = Router()
  const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  } = usersController()

  usersRouter.route('/users')
    .get(getUsers)
    .post(userValidation, createUser)

  usersRouter.route('/users/:id')
    .get(getUserById)
    .put(userParamsValidation, userValidation, updateUser)
    .delete(deleteUser)

  return usersRouter
}
