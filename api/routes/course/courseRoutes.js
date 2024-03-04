import express from "express";
const router = express.Router();
import {
  createCourse,
  getAllCourses,
  getAllTeachers,
  getCourse,
  searchCourse,
  getSessionsSpecificCourse,
} from "../../controllers/course/courseControllers.js";

router.get("/allcourses", getAllCourses);
router.get("/detail/:id", getCourse);
router.post("/createcourse", createCourse);
router.get("/getallteachers", getAllTeachers);
router.post("/search", searchCourse);

router.get("/:id/sessions", getSessionsSpecificCourse);

export default router;
