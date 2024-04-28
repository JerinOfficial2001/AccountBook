import axios from "axios";
import { AUTH_API } from "../API";
import toast from "react-hot-toast";
import { setEncryptedCookie } from "../utils/EncryptCookie";
import { getApi, postApi } from "../utils/services";

export const LoginController = async (formDatas) => {
  try {
    const { data } = await axios.post(AUTH_API + "/login", formDatas);
    if (data.status == "ok") {
      return data.token;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log("LoginErr", error);
  }
};
export const UserDataController = async (token) => {
  try {
    const data = await getApi(AUTH_API + "/userData", token);
    if (data.status == "ok") {
      setEncryptedCookie("userData", JSON.stringify(data.data));
      toast.success("Logged in successfully");
      window.location.href = "/";
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log("UserDataErr", error);
  }
};
export const RegisterController = async (formDatas) => {
  try {
    const { data } = await postApi(AUTH_API + "/register", formDatas);
    if (data.status == "ok") {
      toast.success(data.message);
      window.location.href = "/auth/login";
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log("RegisterErr", error);
  }
};
