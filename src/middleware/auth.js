import jwt from 'jsonwebtoken'

// Middleware to verify JWT from Authorization: Bearer <token>
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || ''
    const token = authHeader.split(' ')[1] || null

    if (!token) {
      return res.status(401).json({ status: 'fail', message: 'No token provided' })
    }

    const secret = process.env.JWT_SECRET
    
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ status: 'fail', message: 'Invalid or expired token' })
  }
}

export default verifyToken
