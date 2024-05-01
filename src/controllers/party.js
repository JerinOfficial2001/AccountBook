import toast from "react-hot-toast";
import { getApi, postApi } from "../utils/services";
import { PARTY_API } from "../API";

export const GetPartyByStaticsID = async (formData) => {
  try {
    const data = await getApi(
      `${PARTY_API}/get/${formData.staticID}?userid=${formData.userID}`,
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
export const GetInitPartyID = async (formData) => {
  try {
    const data = await getApi(
      `${PARTY_API}/getinit/${formData.id}?userid=${formData.userID}`,
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
