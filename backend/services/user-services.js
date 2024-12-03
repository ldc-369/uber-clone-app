import UserModel from '../models/user/user-model.js'

export const createUser = async ({
  name: { firstName, lastName },
  email,
  password
}) => {
  console.log({ firstName, lastName, email, password })
  const hashedPassword = await UserModel.hashPassword(password)

  const user = new UserModel({
    name: { firstName, lastName },
    email,
    password: hashedPassword
  })
  const errors = user.validateSync()

  if (errors) {
    const errorMessages = Object.values(errors.errors).map(err => err.message)
    return {
      status: false,
      statusCode: 400,
      message: 'Validation failed',
      errors: errorMessages
    }
  }

  await user.save()

  return {
    status: true,
    statusCode: 200,
    message: 'Ok',
    user
  }
}
