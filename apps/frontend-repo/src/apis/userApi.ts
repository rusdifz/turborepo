import axios from "axios";
import { User } from "../interfaces/user";
import { ResponseAPI } from "@/interfaces/response";
import { ReqGetUser } from "@/interfaces/request";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const HEADER = {
  Authorization:
    process.env.NEXT_AUTH ??
    "Bearer 099098de4100a22c5f23cc002cc170616e1d439ecaa618fe4e1345522b0063bc",
};

export async function fetchUsersAPI(
  props: ReqGetUser
): Promise<ResponseAPI<User[]>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetch-user-data`, {
      headers: HEADER,
      params: props,
    });
    console.log("response suer", response);

    return response.data;
  } catch (error) {
    console.log("er fetch", error);

    throw new Error("Failed to fetch users");
  }
}

export async function postUserAPI(
  data: Partial<User>
): Promise<ResponseAPI<User>> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-user-data`,
      data,
      { headers: HEADER }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

export async function updateUserApi(
  userId: string,
  data: Partial<User>
): Promise<ResponseAPI<User>> {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-user-data/${userId}`,
      data,
      { headers: HEADER }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
}
