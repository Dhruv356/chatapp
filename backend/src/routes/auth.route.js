import express from 'express';
import { checkAuth, Login, Logout, Signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js'; // Assuming protectRoute is exported from this file

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

// Correct route definition with a forward slash before "update-profile" and correct middleware placement
router.put('/update-profile', protectRoute, updateProfile);

router.get("/check" ,protectRoute ,checkAuth);
export default router;
