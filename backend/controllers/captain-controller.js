export const register = async (req, res, next) => {
  try {
    const validation = validationResult(await req)

    if (!validation.isEmpty()) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validation.array()[0].msg,
        errors: validation.array()
      })
    }

    const { name, email, password } req.body

    const userExists = await CaptainModel.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: 'Captain already exists'
      })
    }

    const hashedPassword = await hashPassword(password)

    const newCaptain = new CaptainModel({
      name,
      email,
      password: hashedPassword
    })

    const resData = await newCaptain.save()

    if (!resData) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: 'Cannot create new captain'
      })
    }

    const token = await resData.generateAuthToken()

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: 'Captain created successfully'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}

export const login = async (req, res, next) => {}

export const getProfile = async (req, res, next) => {}
