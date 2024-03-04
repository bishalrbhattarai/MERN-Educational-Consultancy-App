import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Main from "../pages/Main";
import AdminLogin from "../pages/admin/Login";
import AdminSidebar from "../pages/admin/Drawer";
import AdminProtectedRoute from "../pages/admin/ProtectedRoute";
import StudentProtectedRoute from "../pages/student/ProtectedRoute";

import AdminPublicRoute from "./../pages/admin/PublicRoute";
import StudentPublicRoute from "./../pages/student/PublicRoute";
import TeacherPublicRoute from "./../pages/teacher/PublicRoute";

import AdminStudent from "../pages/admin/Student";
import TeacherStudent from "../pages/teacher/Student";

import AdminCourse from "../pages/admin/Course";
import StudentCourse from "../pages/student/Course";

import AdminTeacher from "../pages/admin/Teacher";
import AdminSession from "../pages/admin/Session";
import AdminLogout from "./../pages/admin/AdminLogout";

import StudentLogin from "../pages/student/Login";
import TeacherLogin from "../pages/teacher/Login";

import StudentRegister from "../pages/student/Register";
import StudentSidebar from "./../pages/student/Drawer";
import StudentLogout from "../pages/student/StudentLogout";
import TeacherLogout from "../pages/teacher/TeacherLogout";

import TeacherSidebar from "../pages/teacher/Drawer";
import TeacherProtectedRoute from "../pages/teacher/ProtectedRoute";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import AdminProfile from "../pages/admin/AdminProfile";
import AddTeacher from "../pages/admin/AddTeacher";

import StudentSession from "../pages/student/Session";
import StudentFindSession from "../pages/student/FindSession";

import TeacherSession from "../pages/teacher/Session";
import TeacherAddSession from "../pages/teacher/AddSession";

import TeacherCourse from "../pages/teacher/Course";
import TeacherEnrollment from "../pages/teacher/Enrollment";

import StudentTeacher from "../pages/student/Teacher";
import StudentProfile from "../pages/student/StudentProfile";
import AdminChangePassword from "../pages/admin/ChangePassword";
import StudentChangePassword from "../pages/student/ChangePassword";

import AddCourse from "../pages/admin/AddCourse";

import AdminCourseIndividual from "../pages/admin/CourseIndividual";
import StudentCourseIndividual from "../pages/student/CourseIndividual";

import AdminSessionIndividual from "../pages/admin/SessionIndividual";
import TeacherSessionIndividual from "../pages/teacher/SessionIndividual";

import EsewaSuccess from "../pages/student/EsewaSuccess";
import EsewaFailure from "../pages/student/EsewaFailure";

// For Payments Routes
import AdminPayment from "../pages/admin/Payment";

const AllRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Main />} />
          </Route>

          <Route path="student">
            <Route
              path="login"
              element={<StudentPublicRoute element={<StudentLogin />} />}
            />
            <Route
              path="register"
              element={<StudentPublicRoute element={<StudentRegister />} />}
            />

            <Route path="dashboard" element={<StudentProtectedRoute />}>
              <Route path="" element={<StudentSidebar />}>
                <Route path="logout" element={<StudentLogout />} />

                <Route path="sessions" element={<StudentSession />} />
                <Route path="teachers" element={<StudentTeacher />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="courses" element={<StudentCourse />} />
                <Route path="esewa_success" element={<EsewaSuccess />} />
                <Route path="esewa_failure" element={<EsewaFailure />} />

                <Route
                  path="course/:id"
                  element={<StudentCourseIndividual />}
                />

                <Route
                  path="course/:id/sessions"
                  element={<StudentFindSession />}
                />

                <Route
                  path="changepassword"
                  element={<StudentChangePassword />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="admin">
            <Route path="logout" element={<AdminLogout />} />

            <Route
              path="login"
              element={<AdminPublicRoute element={<AdminLogin />} />}
            />

            <Route path="dashboard" element={<AdminProtectedRoute />}>
              <Route path="" element={<AdminSidebar />}>
                <Route path="addteacher" element={<AddTeacher />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="students" element={<AdminStudent />} />
                <Route path="teachers" element={<AdminTeacher />} />
                <Route path="sessions" element={<AdminSession />} />
                <Route path="payments" element={<AdminPayment />} />
                <Route
                  path="session/:id"
                  element={<AdminSessionIndividual />}
                />

                <Route path="courses" element={<AdminCourse />} />
                <Route path="addcourse" element={<AddCourse />} />
                <Route path="course/:id" element={<AdminCourseIndividual />} />

                <Route
                  path="changepassword"
                  element={<AdminChangePassword />}
                />
              </Route>
            </Route>
          </Route>

          <Route path="teacher">
            <Route path="logout" element={<TeacherLogout />} />
            <Route
              path="login"
              element={<TeacherPublicRoute element={<TeacherLogin />} />}
            />
            <Route path="dashboard" element={<TeacherProtectedRoute />}>
              <Route path="" element={<TeacherSidebar />}>
                <Route path="sessions" element={<TeacherSession />} />
                <Route path="addsession" element={<TeacherAddSession />} />

                <Route path="students" element={<TeacherStudent />} />
                <Route path="courses" element={<TeacherCourse />} />
                <Route path="enrollments" element={<TeacherEnrollment />} />
                <Route
                  path="session/:id"
                  element={<TeacherSessionIndividual />}
                />

                <Route path="profile" element={<TeacherProfile />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AllRoutes;
