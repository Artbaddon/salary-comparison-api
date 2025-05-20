import { Router } from "express";
import salaryClassification from "../controllers/salary.controller.js";

const router = Router();
router.get("/classify", salaryClassification);

export default router;
