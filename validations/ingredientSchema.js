import Joi from 'joi'

export const ingredientSchema = Joi.object({
  name: Joi.string().min(3).required(),
  quantityID: Joi.string().min(3).required(),
  recipeID: Joi.array().items(Joi.string()).required()
})

export const ingredientParamsSchema = Joi.object({
  id: Joi.string().length(24).required()
})
