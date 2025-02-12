import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./actions";
import { User } from "../apis/user";

interface State {
  users: User[];
  loading: boolean;
  error: string | null;
  updateStatus: "idle" | "loading" | "success" | "error";
}

const initialState: State = {
  users: [],
  loading: false,
  error: null,
  updateStatus: "idle",
};

export const userReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_USER_REQUEST:
      return { ...state, updateStatus: "loading" };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateStatus: "success",
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
    case UPDATE_USER_FAILURE:
      return { ...state, updateStatus: "error", error: action.payload };
    default:
      return state;
  }
};
