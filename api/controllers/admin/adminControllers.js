import Teacher from "../../models/teacher.model.js";
import Admin from "../../models/admin.model.js";
import Student from "../../models/student.model.js";
import Session from "../../models/session.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const foundAdmin = await Admin.findOne({ email });
    console.log("found user:");
    console.log(foundAdmin);
    if (foundAdmin) {
      if (password === foundAdmin.password) {
        delete foundAdmin._doc.password;
        return res.json({
          success: true,
          ...foundAdmin._doc,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid Password",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "No such Admin found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const changeProfilePicture = async (req, res) => {
  console.log(req.body);
  try {
    const { _id } = req.body;
    const response = await uploadOnCloudinary(req.file.path);
    const foundadmin = await Admin.findOne({ _id });
    if (foundadmin) {
      await Admin.findByIdAndUpdate(_id, {
        photoURL: response.secure_url,
      });

      const sendBackUser = await Admin.findOne({ _id });
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

const editProfile = async (req, res) => {
  try {
    const { _id, name, email } = req.body;
    const foundAdmin = await Admin.findOne({ $or: [{ email, email }] });
    if (foundAdmin) {
      res.status(400).json({
        success: false,
        message: "Email or Name already exists ",
      });
    } else {
      await Admin.updateOne(
        { _id },
        {
          $set: {
            name: name,
            email: email,
          },
        }
      );

      const sendBackUser = await Admin.findOne({ _id });
      delete sendBackUser._doc.password;
      res.status(201).json({
        success: true,
        message: "Profile Details Updated",
        ...sendBackUser._doc,
      });
    }
  } catch (error) {
    console.log("something went wrong while Editing Profile");
    console.log(error);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find(
      {},
      {
        password: 0,
      }
    );
    // console.log(teachers);
    res.json(teachers);
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(
      {},
      {
        password: 0,
      }
    );
    // console.log(students);
    res.json(students);
  } catch (error) {
    console.log(error);
  }
};

const addTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("req.file obj k xa heram", req.file);
  try {
    const teacherFound = await Teacher.findOne({ email });

    if (teacherFound) {
      console.log("found");
      console.log(teacherFound);
      res.status(400).json({
        success: false,
        message: "The teacher with this email already exists",
      });
    } else {
      if (req.file == undefined) {
        const teacher = new Teacher({
          name: name,
          email: email,
          password: password,
        });
        await teacher.save();
        console.log(teacher);

        return res.status(201).json({
          success: true,
          message: "Teacher Added Successfully..",
        });
      } else {
        const response = await uploadOnCloudinary(req.file.path);
        const teacher = new Teacher({
          name: name,
          email: email,
          password: password,
          photoURL: response.secure_url,
        });
        await teacher.save();
        console.log(teacher);

        return res.status(201).json({
          success: true,
          message: "Teacher Added Successfully..",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Something went wrong while adding teacher",
    });
  }
};

const deleteTeacher = async (req, res) => {
  const { _id } = req.body;
  try {
    await Teacher.findByIdAndDelete(_id);
    const allTeachers = await Teacher.find(
      {},
      {
        password: 0,
      }
    );

    return res.status(200).json(allTeachers);
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req, res) => {
  const { _id } = req.body;
  try {
    await Student.findByIdAndDelete(_id);
    const allStudents = await Student.find(
      {},
      {
        password: 0,
      }
    );

    return res.status(200).json(allStudents);
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  const { _id, currentPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const foundAdmin = await Admin.findById(_id);
    if (foundAdmin.password != currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Given current password is incorrect ",
      });
    } else {
      foundAdmin.password = newPassword;
      await foundAdmin.save();
      console.log("Password Changed");
      console.log(foundAdmin);
      return res.json({
        success: true,
        message: "Password Changed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllSession = async (req, res) => {
  try {
    const sessions = await Session.aggregate([
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
  getAllTeachers,
  addTeacher,
  getAllStudents,
  deleteTeacher,
  deleteStudent,
  changePassword,
  getAllSession,
};
