import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Teacher's name is mandatory"],
    },

    email: {
      type: String,
      required: [true, "Teachers's email is mandatory"],
    },
    password: {
      type: String,
      required: [true, "Teachers's password is mandatory'"],
    },
    type: {
      type: String,
      default: "teacher",
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

export default mongoose.model("teachers", TeacherSchema);
