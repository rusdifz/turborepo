"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, Chip, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SortIcon from "@mui/icons-material/Sort";

import { User } from "@/interfaces/user";
import UserFormDialog from "./UserFormDialog";

import { useState } from "react";

interface UserTableProps {
  users: User[];
  onSort: () => void;
  onEdit: (data: Partial<User>) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users = [],
  onSort,
  onEdit,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      align: "left",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
            verticalAlign: "middle",
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: "username", headerName: "Username", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
            verticalAlign: "middle",
          }}
        >
          {params.value}
        </div>
      ),
    },

    {
      field: "totalAverageWeightRatings",
      headerName: "Total Average Weight Rating",
      flex: 1,
    },
    { field: "numberOfRents", headerName: "Number Of Rents", flex: 1 },
    { field: "recentlyActive", headerName: "Recently Active", flex: 1 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "MALE" ? "primary" : "secondary"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="update user"
          onClick={() => handleEditClick(params.row as User)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <IconButton onClick={onSort} aria-label="sort users">
        <SortIcon /> sort
      </IconButton>

      <UserFormDialog
        open={isFormOpen}
        user={selectedUser}
        onClose={handleCloseForm}
        onSubmit={onEdit}
      />

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 1 }}
        />
      </Paper>
    </>
  );
};

export default UserTable;
