import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/protected", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;