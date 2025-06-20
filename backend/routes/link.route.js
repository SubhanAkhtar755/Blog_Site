import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import { createLink, getOwnLinks , deleteLink } from "../controllers/link.controller.js";

const router = express.Router();

// POST /api/links - Upload image link
router.post("/generate", isAuthenticated , singleUpload, createLink);

// GET /api/links - Get user's own links
router.get("/my-links", isAuthenticated, getOwnLinks);

router.delete("/delete/:id", isAuthenticated, deleteLink);

export default router;
