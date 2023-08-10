import { Router } from 'express'
import { recipesController } from '../controllers/recipesController.js'
import { recipeValidation, recipeParamsValidation } from '../middlewares/validation.js'

export const recipesRoutes = () => {
  const recipesRouter = Router()
  const {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
  } = recipesController()

  recipesRouter.route('/recipes')
    .get(getRecipes)
    .post(recipeValidation, createRecipe)

  recipesRouter.route('/recipes/:id')
    .get(getRecipeById)
    .put(recipeParamsValidation, recipeValidation, updateRecipe)
    .delete(deleteRecipe)

  return recipesRouter
}
