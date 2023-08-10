import { Router } from 'express'
import { categoriesController } from '../controllers/categoriesController.js'
import { categoryValidation, categoryParamsValidation } from '../middlewares/validation.js'
import { auth } from '../middlewares/auth.js'

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
    .post(auth, categoryValidation, createCategory)

  categoriesRouter.route('/categories/:id')
    .get(getCategoryById)
    .put(auth, categoryParamsValidation, categoryValidation, updateCategory)
    .delete(auth, deleteCategory)

  return categoriesRouter
}
