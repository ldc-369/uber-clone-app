import { Schema } from 'mongoose'
import { comparePassword, generateJWT, hashPassword } from './user/user-methods'

const captainSchema = new Schema(
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
      required: true,
      minlength: 6,
      select: false,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(
            value
          )
        },
        message:
          'Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      }
    },
    socketId: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'busy'],
      default: 'offline'
    },
    vehicle: {
      color: {
        type: String,
        required: [true, 'Vehicle color is required'],
        minlength: [3, 'Color must be at least 3 characters long']
      },
      plate: {
        type: String,
        required: [true, 'Vehicle plate is required'],
        minlength: [3, 'Plate must be at least 3 characters long']
      },
      capacity: {
        type: Number,
        required: [true, 'Vehicle capacity is required'],
        min: [1, 'Capacity must be at least 1']
      },
      vehicleType: {
        type: String,
        required: [true, 'Vehicle type is required'],
        enum: ['car', 'motorcycle', 'auto']
      }
    },
    location: {
      latitude: {
        type: Number,
        required: [true, 'Latitude is required']
      },
      longitude: {
        type: Number,
        required: [true, 'Longitude is required']
      }
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Rating is required']
    }
  },
  {
    timestamps: true
  }
)

captainSchema.methods.generateAuthToken = function () {
  return generateJWT(this.toObject({ getters: false, virtuals: false }))
}

captainSchema.methods.comparePassword = async function (password) {
  return await comparePassword(password, this.password)
}

captainSchema.statics.hashPassword = async function (password) {
  return await hashPassword(password)
}

const CaptainModel = model('Captain', captainSchema)

export default CaptainModel
