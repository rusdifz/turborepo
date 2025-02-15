// import { Formik, Form, Field } from "formik";
// import { User } from "@/interfaces/user";
// import { GenderEnum } from "@repo/interfaces/user";
// import { TextField, Select, MenuItem, Avatar, Chip } from "@mui/material";
// import { DateTimePicker } from "@mui/x-date-pickers";
// import { LoadingButton } from "@mui/lab";
// import { motion } from "framer-motion";

// interface UserFormProps {
//   user: User;
//   onSubmit: (values: Partial<User>) => void;
//   onClose: () => void;
//   isLoading?: boolean;
// }

// const UserForm = ({ user, onSubmit, onClose, isLoading }: UserFormProps) => {
//   const initialValues = {
//     ...user,
//     password: "", // Hidden by default
//     showPassword: false,
//   };

//   // return (
//   //   <Formik initialValues={initialValues} onSubmit={onSubmit}>
//   //     {({ values, setFieldValue }) => (
//   //       <Form>
//   //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 2 }}>
//   //           {/* <div className="md:col-span-10 flex flex-col items-center">
//   //             <Avatar
//   //               src={values.profile_picture}
//   //               sx={{ width: 100, height: 100, mb: 2 }}
//   //             />
//   //             <Field
//   //               name="profile_picture"
//   //               as={TextField}
//   //               label="Profile Picture URL"
//   //               fullWidth
//   //               variant="outlined"
//   //               sx={{ mb: 2 }}
//   //             />
//   //           </div>

//   //           <Field
//   //             name="username"
//   //             as={TextField}
//   //             label="Username"
//   //             required
//   //             variant="filled"
//   //           />

//   //           <Field
//   //             name="email"
//   //             as={TextField}
//   //             label="Email"
//   //             type="email"
//   //             required
//   //             variant="filled"
//   //           />

//   //           <Field
//   //             name="fullname"
//   //             as={TextField}
//   //             label="Full Name"
//   //             variant="filled"
//   //           />

//   //           <Field name="gender" as={Select} label="Gender" variant="filled">
//   //             {Object.values(GenderEnum).map((gender) => (
//   //               <MenuItem key={gender} value={gender}>
//   //                 {gender.toLowerCase()}
//   //               </MenuItem>
//   //             ))}
//   //           </Field>

//   //           <div className="md:col-span-2 flex justify-end gap-2 mt-4">
//   //             <LoadingButton
//   //               type="submit"
//   //               variant="contained"
//   //               // loading={isLoading}
//   //               sx={{
//   //                 background:
//   //                   "linear-gradient(45deg, #6366f1 30%, #a855f7 90%)",
//   //                 color: "white",
//   //               }}
//   //             >
//   //               Update User
//   //             </LoadingButton>
//   //             <button
//   //               type="button"
//   //               onClick={onClose}
//   //               className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
//   //             >
//   //               Cancel
//   //             </button>
//   //           </div> */}
//   //         </motion.div>
//   //       </Form>
//   //     )}
//   //   </Formik>
//   // );

//   return (

//   )
// };

// export default UserForm;

import { User } from "@/interfaces/user";
import { GenderEnum } from "@repo/interfaces/user";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  InputAdornment,
  Chip,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  fullname: Yup.string().required("Nama lengkap wajib diisi"),
  age: Yup.number().min(13, "Minimal 13 tahun").max(100, "Maksimal 100 tahun"),
  password: Yup.string().min(8, "Minimal 8 karakter"),
});

interface UserFormProps {
  user: User;
  onSubmit: (values: Partial<User>) => void;
  onClose: () => void;
  open: boolean;
  // isLoading?: boolean;
}

const UserForm = ({ user, open, onClose, onSubmit }: UserFormProps) => {
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          background: "linear-gradient(to bottom right, #f8f9fa, #ffffff)",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(45deg, #6366f1 30%, #a855f7 90%)",
            color: "white",
            py: 2,
            pr: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Edit User Profile</span>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <Formik
          initialValues={{
            ...user,
            password: "",
            showPassword: false,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <DialogContent sx={{ py: 4 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Profile Section */}
                  <div className="md:col-span-2 space-y-4">
                    <Avatar
                      src={values.profile_picture}
                      sx={{
                        left: "50%",
                        right: "50%",
                        transform: "translateX(-50%)",
                        top: 0,
                        gap: 5,
                        width: 120,
                        height: 120,
                        border: "3px solid #e0e0e0",
                        boxShadow: 3,
                        gridColumn: "1 / -1", // Span seluruh kolom
                      }}
                    />
                  </div>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {/* Main Form */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Field
                          sx={{
                            top: 5,
                          }}
                          name="username"
                          as={TextField}
                          label="Username"
                          margin="dense"
                          variant="filled"
                          fullWidth
                          error={touched.username && !!errors.username}
                          helperText={touched.username && errors.username}
                        />

                        <Field
                          sx={{
                            top: 5,
                          }}
                          margin="dense"
                          name="email"
                          as={TextField}
                          label="Email"
                          type="email"
                          variant="filled"
                          fullWidth
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />

                        <Field
                          sx={{
                            top: 5,
                          }}
                          margin="dense"
                          name="fullname"
                          as={TextField}
                          label="Full Name"
                          variant="filled"
                          fullWidth
                          error={touched.fullname && !!errors.fullname}
                          helperText={touched.fullname && errors.fullname}
                        />

                        <Field
                          sx={{
                            top: 10,
                          }}
                          margin="dense"
                          name="gender"
                          as={Select}
                          label="Gender"
                          variant="filled"
                          fullWidth
                        >
                          {Object.values(GenderEnum).map((gender) => (
                            <MenuItem key={gender} value={gender}>
                              {gender}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>

                      <Divider sx={{ my: 3 }} />
                    </div>
                  </Box>
                </div>
              </DialogContent>

              <DialogActions sx={{ px: 4, pb: 3 }}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Save Changes"
                  )}
                </motion.button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </motion.div>
    </Dialog>
  );
};

export default UserForm;
