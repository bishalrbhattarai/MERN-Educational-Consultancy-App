import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length == 0 || user.type != "admin") {
      navigate("/admin/login");
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
