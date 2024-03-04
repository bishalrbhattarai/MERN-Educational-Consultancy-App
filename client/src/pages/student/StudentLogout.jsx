import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/user";
import { useNavigate } from "react-router-dom";
const StudentLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(removeUser({}));
    navigate("/");
  });
};

export default StudentLogout;
