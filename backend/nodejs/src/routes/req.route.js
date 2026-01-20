import express from "express";
import {
    makeRequest,
    getAllRequest,
    showAnalytics,
    deleteRequest,
} from "../controllers/req.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/request", authMiddleware, makeRequest);

router.get("/requests", authMiddleware, getAllRequest);

router.get("/analytics/last-5", authMiddleware, showAnalytics);

router.delete('/delete/:id', authMiddleware, deleteRequest);

export default router;