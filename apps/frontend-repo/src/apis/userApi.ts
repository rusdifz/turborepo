import axios from "axios";
import { User } from "./user";
import { GenderEnum } from "@repo/interfaces/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const header = {
  Authorization:
    "Bearer 099098de4100a22c5f23cc002cc170616e1d439ecaa618fe4e1345522b0063bc",
};
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-user-data`, {
      headers: header,
    });
    console.log("yoy", response.data);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-user-data`,
      userData,
      { headers: header }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/update-user-data/${id}`,
      userData,
      { headers: header }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};
