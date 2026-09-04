import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import { authenticate } from "../middleware/auth.middleware.js";
import propertyRoutes from "../modules/property/property.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);

router.get("/protected", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;