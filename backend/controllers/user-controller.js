import { validationResult } from 'express-validator'
import { createUser } from '../services/user-services.js'
import UserModel from '../models/user/user-model.js'

export const register = async (req, res, next) => {
  try {
    const validation = validationResult(await req)
    if (!validation.isEmpty()) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: result.array()[0].msg,
        errors: result.array()
      })
    }

    const values = await req.body

    const userExists = await UserModel.findOne({ email: values.email })

    if (userExists) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: 'User already exists'
      })
    }

    const resData = await createUser({ ...values })

    if (!resData.status) {
      return res.status(400).json(resData)
    }

    const token = await resData.user.generateAuthToken()

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'User created successfully'
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Internal Server error'
    })
  }
}

export const login = async (req, res, next) => {
  try {
    const validation = validationResult(await req)

    if (!validation.isEmpty()) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: result.array()[0].msg,
        errors: result.array()
      })
    }
    const { email, password } = await req.body

    const user = await UserModel.findOne({ email }).select('+password')

    if (!user || !(await user?.comparePassword(password))) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    const token = await user.generateAuthToken()

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: 'Logged in successfully'
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Internal Server error'
    })
  }
}

export const getProfile = async (req, res, next) => {
  const token = await req.user.generateAuthToken()

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 24 * 60 * 60 * 1000
  })

  return res.status(200).json({
    status: true,
    message: 'Ok',
    statusCode: 200,
    token
  })
}
