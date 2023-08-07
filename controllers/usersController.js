import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'
import bcrypt from 'bcrypt'

export const usersController = () => {
  const createUser = async (request, response, next) => {
    try {
      const { firstName, lastName, email, address, password, birthday, recipeID } = request.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          address,
          password: hashedPassword,
          birthday: new Date(birthday),
          recipeID
        }
      })
      return response.status(httpStatus.CREATED).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUsers = async (_request, response, next) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          favouriteRecipe: true
        },
        where: {
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUserById = async (request, response, next) => {
    try {
      const { id } = request.params
      const user = await prisma.user.findUnique({
        include: {
          favouriteRecipe: true
        },
        where: {
          id,
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateUser = async (request, response, next) => {
    try {
      const { id } = request.params
      const { firstName, lastName, email, address, password, birthday, recipeID } = request.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const updatedUser = await prisma.user.update({
        where: {
          id
        },
        data: {
          firstName,
          lastName,
          email,
          address,
          password: hashedPassword,
          birthday: new Date(birthday),
          recipeID
        }
      })
      return response.status(httpStatus.OK).json(updatedUser)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteUser = async (request, response, next) => {
    try {
      const { id } = request.params
      prisma.$use(addSoftDelete)
      await prisma.user.delete({
        where: {
          id
        }
      })
      return response
        .status(httpStatus.OK)
        .json({ success: true, message: 'User deleted succesfully.' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }
}
