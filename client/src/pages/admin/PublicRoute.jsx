import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (Object.keys(user).length > 0 || user.type == "admin") {
      navigate("/admin/dashboard");
    }
  }, [user]);

  return <> {element}</>;
};

export default PublicRoute;
