"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} from "../store/actions";
import { updateUser } from "../apis/userApi";
import { User } from "../apis/user";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface UpdateButtonProps {
  user: User;
}

export default function UpdateButton({ user }: UpdateButtonProps) {
  const dispatch = useDispatch();
  const updateStatus = useSelector((state: any) => state.updateStatus);

  const handleUpdate = async () => {
    dispatch(updateUserRequest());
    try {
      const updatedUser = await updateUser(user);
      dispatch(updateUserSuccess(updatedUser));
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <Button variant="contained" onClick={handleUpdate}>
        Update User
      </Button>
      {updateStatus === "loading" && (
        <Typography variant="body2">Updating...</Typography>
      )}
      {updateStatus === "success" && (
        <Typography variant="body2" color="success.main">
          Update successful!
        </Typography>
      )}
      {updateStatus === "error" && (
        <Typography variant="body2" color="error">
          Update failed!
        </Typography>
      )}
    </div>
  );
}
