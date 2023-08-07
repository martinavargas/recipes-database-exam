import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const categoriesController = () => {
  const createCategory = async (request, response, next) => {
    try {
      const { body } = request
      const category = await prisma.category.create({
        data: body
      })
      return response.status(httpStatus.CREATED).json(category)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCategories = async (_request, response, next) => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          recipesInThisCategory: true
        },
        where: {
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(categories)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCategoryById = async (request, response, next) => {
    try {
      const { id } = request.params
      const category = await prisma.category.findFirst({
        include: {
          recipesInThisCategory: true
        },
        where: {
          id,
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(category)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateCategory = async (request, response, next) => {
    try {
      const { id } = request.params
      const { body } = request
      const updatedCategory = await prisma.category.update({
        where: {
          id
        },
        data: body
      })
      return response.status(httpStatus.OK).json(updatedCategory)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteCategory = async (request, response, next) => {
    try {
      prisma.$use(addSoftDelete)
      const { id } = request.params
      await prisma.category.delete({
        where: {
          id
        }
      })
      return response
        .status(httpStatus.OK)
        .json({ success: true, message: 'Category deleted successfully' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
  }
}
