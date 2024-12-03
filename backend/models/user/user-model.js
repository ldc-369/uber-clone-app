import { model, Schema } from 'mongoose'
import { comparePassword, generateJWT, hashPassword } from './user-methods.js'

const userSchema = new Schema(
  {
    name: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [3, 'First name must be at least 3 characters long']
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [3, 'Last name must be at least 3 characters long']
      }
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [5, 'Email must be at least 5 characters long'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minlength: [6, 'Password must be at least 6 characters long']
    },
    socketId: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
)

userSchema.methods.generateAuthToken = function () {
  return generateJWT(this.toObject({ getters: false, virtuals: false }))
}

userSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password)
}

userSchema.statics.hashPassword = async function (password) {
  return await hashPassword(password)
}

const UserModel = model('User', userSchema)

export default UserModel
