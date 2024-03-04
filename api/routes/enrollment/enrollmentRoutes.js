import express from "express";
const router = express.Router();
import {
  createEnrollment,
  handleSuccessEsewa,
  updateEnrollmentStatus,
} from "../../controllers/enrollment/enrollmentControllers.js";

router.post("/createenrollment", createEnrollment);
router.get("/handle-success-esewa", handleSuccessEsewa, updateEnrollmentStatus);

export default router;
