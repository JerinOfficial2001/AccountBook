import axios from "axios";
import { AUTH_API } from "../API";
import toast from "react-hot-toast";
import { setEncryptedCookie } from "../utils/EncryptCookie";
import { getApi, postApi } from "../utils/services";

export const LoginController = async (formDatas) => {
  try {
    const { data } = await axios.post(AUTH_API + "/login", formDatas);
    return data;
  } catch (error) {
    console.log("LoginErr", error);
  }
};
export const UserDataController = async (token) => {
  try {
    const data = await getApi(AUTH_API + "/userData", token);
    return data;
  } catch (error) {
    console.log("UserDataErr", error);
  }
};
export const RegisterController = async (formDatas) => {
  try {
    const data = await postApi(AUTH_API + "/register", formDatas);
    return data;
  } catch (error) {
    console.log("RegisterErr", error);
  }
};
