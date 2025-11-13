import prisma from '../lib/prisma.js'

const registercontroller = async (req, res) => {
    try {
        const { name, email, password } = req.body || {}

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Name, email, and password are required',
            })
        }

        // Check if user already exists
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
            return res.status(409).json({
                status: 'fail',
                message: 'Email already registered',
            })
        }

        // Create user
        const user = await prisma.user.create({
                data: { name, email, password },
            select: { id: true, name: true, email: true, createdAt: true },
        })

        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: { user },
        })
    } catch (err) {
        console.error('Register error:', err)
        return res.status(500).json({ status: 'error', message: 'Internal server error' })
    }
}

export default registercontroller