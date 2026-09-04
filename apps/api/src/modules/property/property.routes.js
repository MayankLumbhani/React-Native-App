import express from "express";
import { createProperty, getUserProperties, getPropertyById, updateProperty } from "./property.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createProperty);
router.get("/", authenticate, getUserProperties);
router.get("/:propertyId", authenticate, getPropertyById);
router.put("/:propertyId", authenticate, updateProperty);

export default router;