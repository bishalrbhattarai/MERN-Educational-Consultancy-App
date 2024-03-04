import Teacher from "../../models/teacher.model.js";
import Course from "../../models/course.model.js";
import Session from "../../models/session.model.js";

import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import mongoose from "mongoose";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Teacher.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        delete user._doc.password;
        return res.status(200).json({
          success: true,
          ...user._doc,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Password is not Matching!",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
      message: "Something went Wrong",
    });
  }
};

const editProfile = async (req, res) => {
  try {
  } catch (error) {}
};

const changeProfilePicture = async (req, res) => {
  console.log(req.body);
  try {
    const { _id } = req.body;
    const response = await uploadOnCloudinary(req.file.path);
    const foundteacher = await Teacher.findOne({ _id });
    if (foundteacher) {
      const updatedTeacher = await Teacher.findByIdAndUpdate(_id, {
        photoURL: response.secure_url,
      });

      const sendBackUser = await Teacher.findOne({ _id });
      delete sendBackUser._doc.password;
      res.json({
        success: true,
        message: "Profile Picture Updated",
        ...sendBackUser._doc,
      });
    }
  } catch (error) {
    console.log("something went wrong while uploading to cloudinary");
    console.log(error);
  }
};

const myCourses = async (req, res) => {
  const { _id } = req.body;
  try {
    const courses = await Course.aggregate([
      { $match: { teacherId: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          localField: "teacherId",
          foreignField: "_id",
          from: "teachers",
          as: "teachersDetails",
        },
      },
      { $unwind: "$teachersDetails" },
    ]);

    console.log(courses);

    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
  }
};
const createSession = async (req, res) => {
  try {
    const session = new Session({
      ...req.body,
      teacherId: new mongoose.Types.ObjectId(req.body.teacherId),
      courseId: new mongoose.Types.ObjectId(req.body.courseId),
    });

    await session.save();
    res.status(201).json({
      success: true,
      message: "Session Created SuccessFully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllSession = async (req, res) => {
  try {
    const sessions = await Session.aggregate([
      { $match: { teacherId: new mongoose.Types.ObjectId(req.body._id) } },
      {
        $lookup: {
          localField: "teacherId",
          foreignField: "_id",
          from: "teachers",
          as: "teachersDetails",
        },
      },

      {
        $lookup: {
          localField: "courseId",
          foreignField: "_id",
          from: "courses",
          as: "coursesDetails",
        },
      },
      { $unwind: "$teachersDetails" },
      { $unwind: "$coursesDetails" },
    ]);
    console.log(sessions);
    res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
  }
};

export {
  login,
  changeProfilePicture,
  editProfile,
  myCourses,
  createSession,
  getAllSession,
};
