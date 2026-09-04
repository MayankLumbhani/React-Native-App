import express from "express";
import {
    createContact,
    getUserContacts,
    getContactById,
} from "./contact.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, createContact);
router.get("/", authenticate, getUserContacts);
router.get("/:contactId", authenticate, getContactById);

export default router;
