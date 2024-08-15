import toast from "react-hot-toast";
import { deleteApi, getApi, postApi } from "../utils/services";
import { PARTY_API } from "../API";
import { getDecryptedCookie } from "../utils/EncryptCookie";

export const GetPartyByStaticsID = async (formData) => {
  const cookie = getDecryptedCookie("accountBook_userData");
  const cachedData = cookie ? JSON.parse(cookie) : false;
  if (cachedData) {
    try {
      const data = await getApi(
        `${PARTY_API}/get/${formData.queryKey[1].staticID}?userid=${cachedData._id}`,
        cachedData.accessToken
      );
      if (data.status == "ok") {
        return data.data;
      } else {
        toast.error(data.message);
        return [];
      }
    } catch (error) {
      console.log(error, "GetPartyErr");
    }
  } else {
    toast.error("Un-authorized");
    return [];
  }
};
export const GetInitPartyID = async (id) => {
  const cookie = getDecryptedCookie("accountBook_userData");
  const cachedData = cookie ? JSON.parse(cookie) : false;
  if (cachedData) {
    try {
      const data = await getApi(
        `${PARTY_API}/getinit/${id}?userid=${cachedData._id}`,
        cachedData.accessToken
      );
      if (data.status == "ok") {
        return data.data;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error, "GetStaticsErr");
    }
  } else {
    toast.error("Un-authorized");
    return null;
  }
};
export const CreateParty = async (formDatas) => {
  try {
    const data = await postApi(
      `${PARTY_API}/create?userid=${formDatas.userID}`,
      formDatas.data,
      formDatas.token
    );
    if (data.status == "ok") {
      toast.success(data.message);
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error, "CreatePartyErr");
  }
};
export const DeleteParty = async (formData) => {
  try {
    const data = await deleteApi(
      `${PARTY_API}/delete/${formData.id}?userid=${formData.userID}`,
      formData.token
    );
    return data;
  } catch (error) {
    console.log(error, "GetStaticsErr");
  }
};
