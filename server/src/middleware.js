import jwt from 'jsonwebtoken'
import { User } from './models.js'

export async function authenticate(req, res, next) {
  const header = req.get('authorization')
  const token = header?.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return res.status(401).json({ message: 'Sign in to continue.' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.sub).select('_id name email role')
    if (!user) return res.status(401).json({ message: 'Your account could not be found.' })
    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') return res.status(401).json({ message: 'Your session has expired. Please sign in again.' })
    next(error)
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Administrator access is required.' })
  next()
}
