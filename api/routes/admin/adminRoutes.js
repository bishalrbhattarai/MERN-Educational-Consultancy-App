import express from "express";
const router = express.Router();
import { upload } from "../../middlewares/multer.middleware.js";

import {
  changeProfilePicture,
  login,
  editProfile,
  getAllTeachers,
  addTeacher,
  getAllStudents,
  deleteTeacher,
  deleteStudent,
  changePassword,
  getAllSession,
} from "../../controllers/admin/adminControllers.js";
router.post("/login", login);

router.post(
  "/changeprofilepicture",
  upload.single("profileImg"),
  changeProfilePicture
);

router.post("/editprofile", editProfile);
router.get("/teachers", getAllTeachers);
router.get("/students", getAllStudents);
router.post("/addteacher", upload.single("file"), addTeacher);
router.post("/deleteteacher", deleteTeacher);
router.post("/deletestudent", deleteStudent);
router.post("/changepassword", changePassword);
router.get("/getallsession", getAllSession);

export default router;
