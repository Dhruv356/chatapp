import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUserForSidebar);
router.get("/messages/:id", protectRoute, getMessages);  // add static prefix "messages"
router.post("/messages/send/:id", protectRoute, sendMessage);  // add static prefix "messages/send"

export default router;
