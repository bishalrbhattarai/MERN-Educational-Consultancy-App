import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length == 0 || user.type != "student") {
      navigate("/student/login");
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
