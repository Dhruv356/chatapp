import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUserForSidebar , sendMessage } from '../controllers/message.controller.js';

const router = express.Router();


router.get ("/users", protectRoute, getUserForSidebar);
router.get ("/:id", protectRoute, getMessages); // Assuming you want to get a specific user by ID

router.post ("/send/:id", protectRoute, sendMessage); // Assuming you want to send a message to a specific user by ID

export default router;