import express from "express";
const router = express.Router();
import { upload } from "../../middlewares/multer.middleware.js";
import {
  login,
  changeProfilePicture,
  editProfile,
  myCourses,
  createSession,
  getAllSession,
} from "../../controllers/teacher/teacherControllers.js";
router.post("/login", login);
router.post(
  "/changeprofilepicture",
  upload.single("profileImg"),
  changeProfilePicture
);
router.post("/mycourses", myCourses);
router.post("/createsession", createSession);

router.post("/editprofile/:id", editProfile);

router.post("/getallsession", getAllSession);
export default router;
