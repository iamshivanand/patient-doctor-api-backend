import express from "express";

import { register, createReport, allReports } from "../controllers/patient.js";

const router = express.Router();

router.post("/register", register);
router.post("/:id/create-report", createReport);
router.post("/:id/all-reports", allReports);

export default router;