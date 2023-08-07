import Joi from 'joi'

export const quantitySchema = Joi.object({
  grams: Joi.number().min(1).required(),
  cup: Joi.number().min(1).required(),
  spoon: Joi.number().min(1).required()
})

export const quantityParamsSchema = Joi.object({
  id: Joi.string().length(24).required()
})
