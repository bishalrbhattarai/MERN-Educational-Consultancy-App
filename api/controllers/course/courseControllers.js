import Course from "../../models/course.model.js";
import Teacher from "../../models/teacher.model.js";
import Session from "../../models/session.model.js";

import mongoose from "mongoose";
const createCourse = async (req, res) => {
  console.log(req.body);
  const { title, shortDescription, completeDescription, price } = req.body;
  console.log(req.body);
  try {
    await Course.create({
      title,
      shortDescription,
      completeDescription,
      price: Number(price),
      teacherId: new mongoose.Types.ObjectId(req.body.teacherId),
    });
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.aggregate([
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

const getCourse = async (req, res) => {
  console.log(req.params);
  try {
    const course = await Course.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
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
    console.log(course[0]);

    res.json(course[0]);
  } catch (error) {
    console.log(error);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    console.log(teachers);
    res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
  }
};

const searchCourse = async (req, res) => {
  const { search } = req.body;
  try {
    const searchedCourse = await Course.aggregate([
      {
        $match: {
          title: { $regex: new RegExp(search, "i") }, // 'i' for case-insensitive matching
        },
      },
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

    console.log(searchedCourse);
    res.json(searchedCourse);
  } catch (error) {
    console.log(error);
  }
};

const getSessionsSpecificCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const sessions = await Session.aggregate([
      {
        $match: {
          courseId: new mongoose.Types.ObjectId(id),
        },
      },
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

    return res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
  }
};

export {
  createCourse,
  getAllCourses,
  getAllTeachers,
  getCourse,
  searchCourse,
  getSessionsSpecificCourse,
};
