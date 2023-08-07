import httpStatus from '../helpers/httpStatus.js'
import { Prisma } from '@prisma/client'

const ERROR_HANDLERS = {
  ValidationError: ({ error, response }) => {
    response.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: 'Validation error on request',
      error: error.message
    })
  },
  P2025: ({ error, response }) => {
    response.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'An operation failed because it depends on one or more records that were required but not found.',
      error: error.code
    })
  },
  defaultError: ({ error, response }) => {
    response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message, isFromErrorHandler: true })
  }
}

const errorHandler = (error, _request, response, _next) => {
  let option = error.name
  if (error.isJoi) {
    option = 'ValidationError'
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    option = error.code
  }
  const handler = ERROR_HANDLERS[option] ?? ERROR_HANDLERS.defaultError
  handler({ response, error })
}

export default errorHandler
