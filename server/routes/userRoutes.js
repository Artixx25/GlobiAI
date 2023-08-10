import express from "express";
import controller from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

// read //
router.get("/:id", verifyToken, controller.getUser)
router.patch("/:id/edit", verifyToken, controller.editUser)

export default router;