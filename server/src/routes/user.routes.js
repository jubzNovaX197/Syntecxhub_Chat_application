import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUsers);

export default router;