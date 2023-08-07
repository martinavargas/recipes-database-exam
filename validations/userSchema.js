import Joi from 'joi'

export const userSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ar'] } }),
  address: Joi.string().min(3).required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  birthday: Joi.date().min('1900-01-01').max('2013-01-01'),
  recipeID: Joi.string().length(24)
})

export const userParamsSchema = Joi.object({
  id: Joi.string().length(24).required()
})
