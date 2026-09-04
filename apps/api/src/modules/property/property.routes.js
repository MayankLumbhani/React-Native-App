import express from "express";
import { createProperty, getUserProperties } from "./property.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createProperty);
router.get("/", authenticate, getUserProperties);

export default router;