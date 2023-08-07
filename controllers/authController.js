import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const authController = () => {
  const login = async (request, response, next) => {
    try {
      const { email, password } = request.body
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return response.status(httpStatus.NOT_FOUND).json({ message: 'Invalid credentials.' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return response.status(httpStatus.NOT_FOUND).json({ message: 'Invalid credentials.' })
      }

      const token = jwt.sign({
        name: user.firstName,
        role: user.role
      }, process.env.SECRET_KEY, { expiresIn: '5m' })

      const refreshToken = jwt.sign({
        name: user.firstName,
        role: user.role
      }, process.env.SECRET_REFRESH_KEY, { expiresIn: '1h' })

      return response.status(httpStatus.OK).json({
        message: 'Login successfull',
        token,
        refreshToken
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const refresh = async (request, response, next) => {
    try {
      const { refreshToken } = request.body

      const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY)

      const token = jwt.sign({
        name: decoded.name
      }, process.env.SECRET_KEY, { expiresIn: '5m' })

      const newRefreshToken = jwt.sign({
        name: decoded.name
      }, process.env.SECRET_REFRESH_KEY, { expiresIn: '1h' })

      response.status(httpStatus.OK).json({
        message: 'Token refreshed succesfully',
        token,
        refreshToken: newRefreshToken
      })
    } catch (error) {
      next(error)
    }
  }

  const register = async (request, response, next) => {
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

  return {
    login,
    refresh,
    register
  }
}
