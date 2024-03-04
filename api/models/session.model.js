import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, "is Required"],
    },
    endDate: {
      type: Date,
      required: [true, "is Required"],
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teachers",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    participants: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "students",
        },
        status: {
          type: String,
          enum: ["pending", "enrolled", "cancelled"],
          default: "enrolled",
        },
      },
    ],
    rating: [
      {
        type: Number,
        min: 1,
        max: 5,
      },
    ],
    comment: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("sessions", sessionSchema);
