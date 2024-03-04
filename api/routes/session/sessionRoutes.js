import express from "express";
const router = express.Router();
import {
  //   createCourse,
  //   getAllCourses,
  //   getAllTeachers,
  getSession,
  //   searchCourse,
} from "../../controllers/session/sessionControllers.js";

// router.get("/allcourses", getAllCourses);
// router.get("/detail/:id", getCourse);
// router.post("/createcourse", createCourse);
// router.get("/getallteachers", getAllTeachers);
// router.post("/search", searchCourse);

router.get("/detail/:id", getSession);

export default router;
