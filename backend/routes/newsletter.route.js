import express from "express";
import { subscribeNewsletter } from "../controllers/newsletter.controller.js";

const router = express.Router();

// POST /api/newsletter/subscribe
router.post("/subscribe", subscribeNewsletter);

export default router;
