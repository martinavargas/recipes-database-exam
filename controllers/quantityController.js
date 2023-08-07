import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const quantityController = () => {
  const createQuantity = async (request, response, next) => {
    try {
      const { body } = request
      const createQuantity = await prisma.quantity.create({
        data: body
      })
      return response.status(httpStatus.CREATED).json(createQuantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getQuantity = async (_request, response, next) => {
    try {
      const quantity = await prisma.quantity.findMany({
        where: {
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(quantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getQuantityById = async (request, response, next) => {
    try {
      const { id } = request.params
      const quantity = await prisma.quantity.findUnique({
        where: {
          id,
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(quantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateQuantity = async (request, response, next) => {
    try {
      const { id } = request.params
      const { body } = request
      const updatedQuantity = await prisma.quantity.update({
        where: {
          id
        },
        data: body
      })
      return response.status(httpStatus.OK).json(updatedQuantity)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteQuantity = async (request, response, next) => {
    try {
      const { id } = request.params
      prisma.$use(addSoftDelete)
      await prisma.quantity.delete({
        where: {
          id
        }
      })
      return response
        .status(httpStatus.OK)
        .json({ success: true, message: 'Quantity deleted succesfully.' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getQuantity,
    getQuantityById,
    createQuantity,
    updateQuantity,
    deleteQuantity
  }
}
