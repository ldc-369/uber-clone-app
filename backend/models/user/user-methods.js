import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const generateJWT = user => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
  return token
}

export const hashPassword = async password => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}
