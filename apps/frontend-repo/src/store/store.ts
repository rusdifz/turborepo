import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { userReducer } from "./reducers";

// export const store = configureStore({
//     reducer: userReducer,
//     middleware: getDefaultMiddleware => getDefaultMiddleware({
//       thunk: {
//         extraArgument: myCustomApiService
//       }
//     })

// });

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
