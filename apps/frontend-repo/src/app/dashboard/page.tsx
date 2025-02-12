"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase/config";
import { fetchUsers } from "../../apis/userApi";
import { User } from "../../apis/user";
import { GenderEnum } from "@repo/interfaces/user";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserTable from "../../components/UserTable";
import UpdateButton from "../../components/UpdateButton";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //   if (!user) {
      //     router.push("/login");
      //   } else {
      //     setCurrentUser(user);
      //   }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();

      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleSort = () => {
    const sorted = [...users].sort((a: any, b: any) =>
      a.username.localeCompare(b.username)
    );
    setUsers(sorted);
  };

  const handleCreate = async () => {
    // Contoh pembuatan user baru (dummy)
    const newUser: User = {
      id: "",
      username: "newUser",
      email: "newuser@example.com",
      fullname: "New User",
      password: "password",
      profile_picture: "/images/default.png",
      age: 20,
      gender: GenderEnum.MALE,
      address: "Unknown",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      created_by: currentUser?.uid || "system",
      updated_by: currentUser?.uid || "system",
      totalAverageWeightRatings: 0,
      numberOfRents: 0,
      recentlyActive: 0,
      potentialScore: 0,
    };
    const created = await (
      await import("../../apis/userApi")
    ).createUser(newUser);
    setUsers([...users, created]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {/* <UserTable users={users} onSort={handleSort} onCreate={handleCreate} /> */}
      <UserTable users={users} />
      {users.length > 0 && <UpdateButton user={users[0]} />}
    </Box>
  );
}
