import { Router } from "express";
import { register, login } from "./auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "./auth.validation.js";
import { validate } from "../../middleware/validation.middleware.js";

const router = Router();

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

export default router;