import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectToDB } from "./db/config.js";
const app = express();
const PORT = 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(cors({ accept: "*" }));
import adminRoutes from "./routes/admin/adminRoutes.js";
import studentRoutes from "./routes/student/studentRoutes.js";
import teacherRoutes from "./routes/teacher/teacherRoutes.js";
import courseRoutes from "./routes/course/courseRoutes.js";
import sessionRoutes from "./routes/session/sessionRoutes.js";
import enrollmentRoutes from "./routes/enrollment/enrollmentRoutes.js";
import paymentRoutes from "./routes/payment/paymentRoutes.js";

app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/course", courseRoutes);
app.use("/session", sessionRoutes);
app.use("/enrollment", enrollmentRoutes);
app.use("/payment", paymentRoutes);

app.listen(PORT, async () => {
  console.log(`Running on port ${PORT}`);
  await connectToDB();
});
