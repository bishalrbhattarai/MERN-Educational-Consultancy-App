import mongoose from "mongoose";
import Session from "../../models/session.model.js";

const getSession = async (req, res) => {
  try {
    const sessions = await Session.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
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
    console.log("the individual session is:");
    console.log(sessions[0]);
    res.status(200).json(sessions[0]);
  } catch (error) {
    console.log(error);
  }
};

export { getSession };
