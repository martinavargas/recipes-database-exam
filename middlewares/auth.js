import jwt from 'jsonwebtoken'
import HTTP_STATUS from '../helpers/httpStatus.js'

export const auth = async (request, response, next) => {
    const headers = request.headers
  const { authorization } = headers
  const token = authorization.split(' ')[1]

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  const { role } = decodedToken
  const ADMIN_ROLE = 'ADMIN'

  if (role !== ADMIN_ROLE) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'You are not authorized to access this resource.'
    })
  }
  next()
}
