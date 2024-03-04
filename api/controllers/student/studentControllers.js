import Student from "../../models/student.model.js";
import Session from "../../models/session.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import mongoose from "mongoose";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const userExist = await Student.findOne({ email });
    if (userExist) {
      res.json({
        status: 200,
        success: false,
        message: "User Already Exists",
      });
    } else {
      const student = new Student({
        name,
        email,
        password,
      });
      await student.save();
      res.json({
        status: 201,
        success: "true",
        message: "Student Registered",
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email: email });
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

const google = async (req, res) => {
  try {
    const user = await Student.findOne({ email: req.body.email });
    if (user) {
      delete user._doc.password;
      return res.status(200).json({
        success: true,
        ...user._doc,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      console.log(generatedPassword);

      // const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new Student({
        name: req.body.email.split("@")[0],
        email: req.body.email,
        password: generatedPassword,
        photoURL: req.body.photoURL,
      });

      await newUser.save();
      delete newUser._doc.password;

      return res.status(201).json({
        success: true,
        ...newUser._doc,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const changeProfilePicture = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const { _id } = req.body;
    const response = await uploadOnCloudinary(req.file.path);
    const foundstudent = await Student.findOne({ _id });
    if (foundstudent) {
      await Student.findByIdAndUpdate(_id, {
        photoURL: response.secure_url,
      });

      const sendBackUser = await Student.findOne({ _id });
      delete sendBackUser._doc.password;
      res.status(201).json({
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

const changePassword = async (req, res) => {
  const { _id, currentPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const foundStudent = await Student.findById(_id);
    if (foundStudent.password != currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Given current password is incorrect ",
      });
    } else {
      foundStudent.password = newPassword;
      await foundStudent.save();
      console.log("Password Changed");
      console.log(foundStudent);
      return res.json({
        success: true,
        message: "Password Changed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getMySessions = async (req, res) => {
  try {
    const { studentId } = req.body;
    const sessions = await Session.aggregate([
      {
        $match: {
          participants: {
            $elemMatch: {
              studentId: new mongoose.Types.ObjectId(studentId),
            },
          },
        },
      },
      {
        $lookup: {
          localField: "participants.studentId",
          foreignField: "_id",
          from: "students",
          as: "studentDetails",
        },
      },

      {
        $lookup: {
          localField: "courseId",
          foreignField: "_id",
          from: "courses",
          as: "courseDetails",
        },
      },
      {
        $lookup: {
          localField: "teacherId",
          foreignField: "_id",
          from: "teachers",
          as: "teacherDetails",
        },
      },
      { $unwind: "$teacherDetails" },
      { $unwind: "$studentDetails" },
      { $unwind: "$courseDetails" },
      {
        $project: {
          participants: 0,
        },
      },
    ]);

    res.json(sessions);
  } catch (error) {
    console.log(error);
  }
};

const getMyTeachers = async (req, res) => {
  try {
    const { studentId } = req.body;
    const sessions = await Session.aggregate([
      {
        $match: {
          participants: {
            $elemMatch: {
              studentId: new mongoose.Types.ObjectId(studentId),
            },
          },
        },
      },

      {
        $lookup: {
          localField: "teacherId",
          foreignField: "_id",
          from: "teachers",
          as: "teacherDetails",
        },
      },
      { $unwind: "$teacherDetails" },
      {
        $project: {
          participants: 0,
        },
      },
    ]);
    console.log(sessions);
    res.json(sessions);
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  login,
  google,
  changeProfilePicture,
  changePassword,
  getMySessions,
  getMyTeachers,
};
