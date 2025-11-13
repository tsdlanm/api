import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body || {}
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Email and password are required' })
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'Invalid email or password' })
        }

        // Plain-text comparison 
        if (user.password !== password) {
            return res.status(401).json({ status: 'fail', message: 'Invalid email or password' })
        }

        const secret = process.env.JWT_SECRET
        
        const token = jwt.sign({ userId: user.id, name: user.name, email: user.email}, secret || 'dev_secret', { algorithm: 'HS256', expiresIn: '1d' })

        // Response must match user's requested shape
        return res.status(200).json({
            status: 'success',
            message: 'User logged successfully',
            data: { accessToken: token },
        })
    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}

export default logincontroller