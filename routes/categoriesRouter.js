import { Router } from 'express'
import { categoriesController } from '../controllers/categoriesController.js'
import { categoryValidation, categoryParamsValidation } from '../middlewares/validation.js'

export const categoriesRoutes = () => {
  const categoriesRouter = Router()
  const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  } = categoriesController()

  categoriesRouter.route('/categories')
    .get(getCategories)
    .post(categoryValidation, createCategory)

  categoriesRouter
    .route('/categories/:id')
    .get(getCategoryById)
    .put(categoryParamsValidation, categoryValidation, updateCategory)
    .delete(deleteCategory)

  return categoriesRouter
}
