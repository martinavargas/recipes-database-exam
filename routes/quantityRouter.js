import { Router } from 'express'
import { quantityController } from '../controllers/quantityController.js'
import { quantityValidation, quantityParamsValidation } from '../middlewares/validation.js'

export const quantityRoutes = () => {
  const quantityRouter = Router()
  const {
    getQuantity,
    getQuantityById,
    createQuantity,
    updateQuantity,
    deleteQuantity
  } = quantityController()

  quantityRouter.route('/quantity')
    .get(getQuantity)
    .post(quantityValidation, createQuantity)

  quantityRouter
    .route('/quantity/:id')
    .get(getQuantityById)
    .put(quantityParamsValidation, quantityValidation, updateQuantity)
    .delete(deleteQuantity)

  return quantityRouter
}
