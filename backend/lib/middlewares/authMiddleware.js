import jwt from 'jsonwebtoken'
import UserModel from '../../models/user/user-model.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token || typeof token !== 'string')
      return res
        .status(401)
        .json({ status: false, message: 'Unauthorized', statusCode: 401 })

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if (!payload || !payload?._id) {
      return res
        .status(401)
        .json({ status: false, message: 'Unauthorized', statusCode: 401 })
    }

    const user = await UserModel.findById(payload._id)

    if (!user)
      return res
        .status(401)
        .json({ status: false, message: 'Unauthorized', statusCode: 401 })

    req.user = user
    next()
  } catch (error) {
    console.error(error)
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized',
        statusCode: 401
      })
    }

    res.status(500).json({
      status: false,
      message: 'Internal server error',
      statusCode: 500
    })
  }
}
