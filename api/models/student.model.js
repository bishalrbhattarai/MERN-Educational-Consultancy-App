import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student's name is mandatory"],
    },
    email: {
      type: String,
      required: [true, "Student's email is mandatory"],
    },
    password: {
      type: String,
      required: [true, "Student's password is mandatory'"],
    },
    type: {
      type: String,
      default: "student",
    },
    photoURL: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("students", studentSchema);
