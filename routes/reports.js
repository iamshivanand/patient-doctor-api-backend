import express from "express";

import { status } from "../controllers/report.js";

const router = express.Router();
router.post("/", status);

export default router;
