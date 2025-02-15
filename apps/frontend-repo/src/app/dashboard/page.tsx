"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../store/actions";
import DashboardTemplate from "../../components/templates/DashboardTemplates";
import DashboardPanel from "../../components/organisms/DashboardPanel";
import { fetchUsersAPI, updateUserApi } from "../../apis/userApi";
import { Typography, Button, Box } from "@mui/material";
import { RootState } from "../../store/store";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/interfaces/user";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../lib/config/firebase";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // if (!user) {
      //   router.push("/login");
      // } else {
      //   setCurrentUser(user);
      // }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    async function loadData() {
      dispatch(fetchUsersStart());
      try {
        const resp = await fetchUsersAPI({});
        dispatch(fetchUsersSuccess(resp.data));
      } catch (err: any) {
        dispatch(fetchUsersFailure(err.message));
      }
    }
    loadData();
  }, [dispatch]);

  const handleSort = async () => {
    dispatch(fetchUsersStart());
    try {
      const respSort = await fetchUsersAPI({
        sort: "potentialScore",
        order: "desc",
      });
      dispatch(fetchUsersSuccess(respSort.data));
    } catch (err: any) {
      dispatch(fetchUsersFailure(err.message));
    }
  };

  const handleEdit = async (data: Partial<User>) => {
    console.log("Edit user dengan id:", data);
    try {
      (data.updated_by = currentUser?.uid || "system"),
        await updateUserApi(data.id, data);
      handleManualRefresh();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleManualRefresh = async () => {
    dispatch(fetchUsersStart());
    try {
      const resp = await fetchUsersAPI({});
      dispatch(fetchUsersSuccess(resp.data));
    } catch (err: any) {
      dispatch(fetchUsersFailure(err.message));
    }
  };

  return (
    <DashboardTemplate>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h3" align="center">
          User Dashboard
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleManualRefresh}
        >
          Refresh User
        </Button>
      </Box>
      {loading && <Typography variant="body1">Loading...</Typography>}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      <DashboardPanel users={users} onSort={handleSort} onEdit={handleEdit} />
    </DashboardTemplate>
  );
};

export default DashboardPage;
