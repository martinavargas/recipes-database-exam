import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import addSoftDelete from '../middlewares/softDelete.js'

export const recipesController = () => {
  const createRecipe = async (request, response, next) => {
    try {
      const { body } = request
      const recipe = await prisma.recipe.create({
        data: body
      })
      return response.status(httpStatus.CREATED).json(recipe)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getRecipes = async (_request, response, next) => {
    try {
      const recipes = await prisma.recipe.findMany({
        include: {
          categories: true,
          ingredients: true
        },
        where: {
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(recipes)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getRecipeById = async (request, response, next) => {
    try {
      const { id } = request.params
      const recipe = await prisma.recipe.findUnique({
        include: {
          categories: true,
          ingredients: true
        },
        where: {
          id,
          deletedAt: false
        }
      })
      return response.status(httpStatus.OK).json(recipe)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateRecipe = async (request, response, next) => {
    try {
      const { id } = request.params
      const { body } = request
      const updatedRecipe = await prisma.recipe.update({
        where: {
          id
        },
        data: body
      })
      return response.status(httpStatus.OK).json(updatedRecipe)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteRecipe = async (request, response, next) => {
    try {
      const { id } = request.params
      prisma.$use(addSoftDelete)
      await prisma.recipe.delete({
        where: {
          id
        }
      })
      return response
        .status(httpStatus.OK)
        .json({ success: true, message: 'Recipe deleted succesfully.' })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  }
}
