import express from 'express';
import logincontroller from '../controllers/logincontroller.js';
import registercontroller from '../controllers/registercontroller.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registercontroller);
router.post('/login', logincontroller);

// GET User
router.get('/users/me', verifyToken, (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'User retrieved',
    data: {
      userId: req.user?.userId,
      name: req.user?.name,
      email: req.user?.email
    }
  });
});

export default router;