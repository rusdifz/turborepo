// "use client";
// import React from "react";
// import { User } from "../apis/user";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";

// interface UserTableProps {
//   users: User[];
//   onSort: () => void;
//   onCreate: () => void;
// }

// export default function UserTable({ users, onSort, onCreate }: UserTableProps) {
//   return (
//     <Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Button variant="outlined" onClick={onSort}>
//           Sort Users
//         </Button>
//         <Button variant="contained" onClick={onCreate}>
//           Create User
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table aria-label="User Table">
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Username</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Fullname</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.fullname}</TableCell>
//                 <TableCell>
//                   {/* Contoh tombol update (bisa dikembangkan lebih lanjut) */}
//                   <Button variant="text" color="primary" size="small">
//                     Update
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

"use client";
import { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { User } from "@/apis/user";
import { Button, Chip, Box } from "@mui/material";
// import UserForm from "@/components/molecules/UserForm/UserForm";

const columns: GridColDef[] = [
  { field: "username", headerName: "Username", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "fullname", headerName: "Full Name", flex: 1 },
  {
    field: "gender",
    headerName: "Gender",
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === "MALE" ? "primary" : "secondary"}
      />
    ),
  },
  { field: "potentialScore", headerName: "Potential Score", type: "number" },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    renderCell: (params) => (
      <Button
        variant="outlined"
        size="small"
        onClick={() => console.log("Edit", params.row)}
      >
        Edit
      </Button>
    ),
  },
];

export default function UserTable({ users }: { users: User[] }) {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "potentialScore", sort: "desc" },
  ]);
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box
      sx={{ height: 600, width: "100%", backgroundColor: "background.paper" }}
    >
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Create User ddd
        </Button>
      </Box>
      <DataGrid
        rows={users}
        columns={columns}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
      {/* <UserForm open={openForm} onClose={() => setOpenForm(false)} /> */}
    </Box>
  );
}
