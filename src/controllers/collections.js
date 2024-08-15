import toast from "react-hot-toast";
import { deleteApi, getApi, postApi } from "../utils/services";
import { COLLECTION_API } from "../API";
import { getDecryptedCookie } from "../utils/EncryptCookie";

export const GetCollectionByPartyID = async (ID) => {
  const cookie = getDecryptedCookie("accountBook_userData");
  const cachedData = cookie ? JSON.parse(cookie) : false;
  if (cachedData) {
    try {
      const data = await getApi(
        `${COLLECTION_API}/get/${ID}?userid=${cachedData._id}`,
        cachedData.accessToken
      );
      if (data.status == "ok") {
        return data.data;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      console.log(error, "GetCollectionByPartyIDErr");
    }
  } else {
    toast.error("Un-authorized");
    return null;
  }
};
export const GetInitCollection = async (formData) => {
  try {
    const data = await getApi(
      `${COLLECTION_API}/getinit/${formData.id}?userid=${formData.userID}`,
      formData.token
    );
    if (data.status == "ok") {
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error, "GetInitCollectionErr");
  }
};
export const CreateCollection = async (formDatas) => {
  try {
    const data = await postApi(
      `${COLLECTION_API}/create?userid=${formDatas.userID}`,
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
    console.log(error, "CreateCollectionErr");
  }
};
export const DeleteCollection = async (formDatas) => {
  try {
    const data = await deleteApi(
      `${COLLECTION_API}/delete/${formDatas.id}?userid=${formDatas.userID}&partyID=${formDatas.partyID}`,
      formDatas.token
    );
    return data;
  } catch (error) {
    console.log(error, "CreateCollectionErr");
  }
};
