import Joi from 'joi'

export const recipeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  categoryID: Joi.array().items(Joi.string()).required(),
  preparationTime: Joi.string().min(3),
  cookingTime: Joi.string().min(3),
  instructions: Joi.string().min(3).required(),
  ingredientID: Joi.array().items(Joi.string()).required()
})

export const recipeParamsSchema = Joi.object({
  id: Joi.string().length(24).required()
})
