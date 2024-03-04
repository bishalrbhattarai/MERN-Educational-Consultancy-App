import express from "express";
const router = express.Router();
import {
  register,
  login,
  google,
  changeProfilePicture,
  changePassword,
  getMySessions,
  getMyTeachers,
} from "../../controllers/student/studentControllers.js";
import { upload } from "../../middlewares/multer.middleware.js";
router.post("/register", register);
router.post("/login", login);
router.post("/google", google);
router.post(
  "/changeprofilepicture",
  upload.single("file"),
  changeProfilePicture
);
router.post("/changepassword", changePassword);
router.post("/getmysessions", getMySessions);
router.post("/getmyteachers", getMyTeachers);

export default router;
