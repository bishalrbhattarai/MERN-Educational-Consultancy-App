import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Admin's email is mandatory"],
  },
  email: {
    type: String,
    required: [true, "Admin's email is mandatory"],
  },
  password: {
    type: String,
    required: [true, "Admin's password is mandatory'"],
  },
  type: {
    type: String,
    default: "admin",
  },
  photoURL: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
});

export default mongoose.model("admins", AdminSchema);
