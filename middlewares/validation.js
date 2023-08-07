import { recipeSchema, recipeParamsSchema } from '../validations/recipeSchema.js'
import { userSchema, userParamsSchema } from '../validations/userSchema.js'
import { quantitySchema, quantityParamsSchema } from '../validations/quantitySchema.js'
import { ingredientSchema, ingredientParamsSchema } from '../validations/ingredientSchema.js'
import { categorySchema, categoryParamsSchema } from '../validations/categorySchema.js'

export const recipeValidation = (request, _response, next) => {
  const data = request.body
  const { error } = recipeSchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const recipeParamsValidation = (request, _response, next) => {
  const params = request.params
  const { error } = recipeParamsSchema.validate(params)
  error ? next(error) : next()
}

export const userValidation = (request, _response, next) => {
  const data = request.body
  const { error } = userSchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const userParamsValidation = (request, _response, next) => {
  const params = request.params
  const { error } = userParamsSchema.validate(params)
  error ? next(error) : next()
}

export const quantityValidation = (request, _response, next) => {
  const data = request.body
  const { error } = quantitySchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const quantityParamsValidation = (request, _response, next) => {
  const params = request.params
  const { error } = quantityParamsSchema.validate(params)
  error ? next(error) : next()
}

export const ingredientValidation = (request, _response, next) => {
  const data = request.body
  const { error } = ingredientSchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const ingredientParamsValidation = (request, _response, next) => {
  const params = request.params
  const { error } = ingredientParamsSchema.validate(params)
  error ? next(error) : next()
}

export const categoryValidation = (request, _response, next) => {
  const data = request.body
  const { error } = categorySchema.validate(data, { abortEarly: false })
  error ? next(error) : next()
}

export const categoryParamsValidation = (request, _response, next) => {
  const params = request.params
  const { error } = categoryParamsSchema.validate(params)
  error ? next(error) : next()
}
