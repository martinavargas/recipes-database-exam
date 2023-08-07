import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const ingredientsController = () => {
  const createIngredient = async (request, response, next) => {
    try {
      const { body } = request
      const ingredient = await prisma.ingredient.create({
        data: body
      })
      return response.status(httpStatus.CREATED).json(ingredient)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getIngredients = async (_request, response, next) => {
    try {
      const ingredients = await prisma.ingredient.findMany({
        include: {
          recipesWithThisIngredient: true,
          quantity: true
        },
        where: {
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(ingredients)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getIngredientById = async (request, response, next) => {
    try {
      const { id } = request.params
      const ingredient = await prisma.ingredient.findUnique({
        include: {
          recipesWithThisIngredient: true,
          quantity: true
        },
        where: {
          id,
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(ingredient)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateIngredient = async (request, response, next) => {
    try {
      const { id } = request.params
      const { body } = request
      const updatedIngredient = await prisma.ingredient.update({
        where: {
          id
        },
        data: body
      })
      return response.status(httpStatus.OK).json(updatedIngredient)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteIngredient = async (request, response, next) => {
    try {
      const { id } = request.params
      prisma.$use(addSoftDelete)
      await prisma.ingredient.delete({
        where: {
          id
        }
      })
      return response
        .status(httpStatus.OK)
        .json({ success: true, message: 'Ingredient deleted succesfully' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
  }
}
