import { Router } from 'express'
import { recipesController } from '../controllers/recipesController.js'
import { recipeValidation, recipeParamsValidation } from '../middlewares/validation.js'
import { auth } from '../middlewares/auth.js'

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
    .post(auth, recipeValidation, createRecipe)

  recipesRouter.route('/recipes/:id')
    .get(getRecipeById)
    .put(auth, recipeParamsValidation, recipeValidation, updateRecipe)
    .delete(auth, deleteRecipe)

  return recipesRouter
}
