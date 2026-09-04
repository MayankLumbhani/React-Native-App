import express from "express";
import { createProperty, getUserProperties, getPropertyById, updateProperty, deleteProperty, linkContact } from "./property.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createProperty);
router.get("/", authenticate, getUserProperties);
router.get("/:propertyId", authenticate, getPropertyById);
router.put("/:propertyId", authenticate, updateProperty);
router.delete("/:propertyId", authenticate, deleteProperty);
router.post("/:propertyId/contacts/:contactId", authenticate, linkContact);

export default router;