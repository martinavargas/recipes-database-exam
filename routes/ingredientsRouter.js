import { Router } from 'express'
import { ingredientsController } from '../controllers/ingredientsController.js'
import { ingredientValidation, ingredientParamsValidation } from '../middlewares/validation.js'

export const ingredientsRoutes = () => {
  const ingredientsRouter = Router()
  const {
    getIngredients,
    getIngredientById,
    createIngredient,
    updateIngredient,
    deleteIngredient
  } = ingredientsController()

  ingredientsRouter
    .route('/ingredients')
    .get(getIngredients)
    .post(ingredientValidation, createIngredient)

  ingredientsRouter
    .route('/ingredients/:id')
    .get(getIngredientById)
    .put(ingredientParamsValidation, ingredientValidation, updateIngredient)
    .delete(deleteIngredient)

  return ingredientsRouter
}
