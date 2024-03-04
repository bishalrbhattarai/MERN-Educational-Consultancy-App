import Session from "../../models/session.model.js";
const getAllPayments = async (req, res) => {
  try {
    const payments = await Session.aggregate([
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

      {
        $lookup: {
          localField: "participants.studentId",
          foreignField: "_id",
          from: "students",
          as: "studentDetails",
        },
      },

      {
        $unwind: "$participants",
      },

      { $unwind: "$teachersDetails" },
      { $unwind: "$coursesDetails" },
    ]);
    console.log(payments);
    res.json(payments);
  } catch (error) {
    console.log(error);
  }
};

export { getAllPayments };
