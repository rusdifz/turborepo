"use client";
import React from "react";
import { Box } from "@mui/material";
import UserTable from "../molecules/UserTable";
import { User } from "@/interfaces/user";

interface DashboardPanelProps {
  users: User[];
  onSort: () => void;
  onEdit: (data: any) => void;
}

const DashboardPanel: React.FC<DashboardPanelProps> = ({
  users,
  onSort,
  onEdit,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <UserTable users={users} onSort={onSort} onEdit={onEdit} />
    </Box>
  );
};

export default DashboardPanel;
