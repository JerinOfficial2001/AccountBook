import toast from "react-hot-toast";
import { getApi, postApi } from "../utils/services";
import { COLLECTION_API } from "../API";

export const GetCollectionByPartyID = async (formData) => {
  try {
    const data = await getApi(
      `${COLLECTION_API}/get/${formData.partyID}?userid=${formData.userID}`,
      formData.token
    );
    if (data.status == "ok") {
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error, "GetStaticsErr");
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
    console.log(error, "GetStaticsErr");
  }
};
