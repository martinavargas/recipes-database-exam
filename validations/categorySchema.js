import Joi from 'joi'

export const categorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  recipeID: Joi.array().items(Joi.string()).required()
})

export const categoryParamsSchema = Joi.object({
  id: Joi.string().length(24).required()
})
