import { body } from 'express-validator'

export const registerUser = [
  body('email').isEmail().withMessage('Invalid Email'),
  body('name.firstName')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),
  body('name.lastName')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

export const loginUser = [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

export const registerCaptain = [
  body('email').isEmail().withMessage('Invalid Email'),
  body('name.firstName')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters long'),
  body('name.lastName')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters long'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('vehicle.color')
    .isLength({ min: 3 })
    .withMessage('Vehicle color must be at least 3 characters long'),
  body('vehicle.plate')
    .isLength({ min: 3 })
    .withMessage('Vehicle plate must be at least 3 characters long'),
  body('vehicle.capacity')
    .isInt({ min: 1 })
    .withMessage('Vehicle capacity must be at least 1'),
  body('vehicle.vehicleType')
    .isIn(['car', 'motorcycle', 'auto'])
    .withMessage('Vehicle type must be one of car, motorcycle, or auto'),
  body('location.latitude')
    .isFloat()
    .withMessage('Latitude is required and must be a number'),
  body('location.longitude')
    .isFloat()
    .withMessage('Longitude is required and must be a number')
]

export const loginCaptain = [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]
