import express from "express";
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import validateRequest from  "../middleware/auth.validateRequest.js";
import { signupSchema, loginSchema } from "../validators/auth.validator.js";
import { loginLimiter, signupLimiter } from "../middleware/rateLimit.middleware.js";


import validateRequest from  "../middleware/auth.validateRequest.js";
import { signupSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema),signupLimiter, signup);
router.post("/login", validateRequest(loginSchema), loginLimiter, login);

router.post("/logout", logout);

router.post("/onboarding", protectRoute, onboard);

// check if user is logged in
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
