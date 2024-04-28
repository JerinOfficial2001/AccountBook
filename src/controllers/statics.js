import toast from "react-hot-toast";
import { STATICS_API } from "../API";
import { getApi } from "../utils/services";

export const GetStaticsByType = async (formData) => {
  try {
    const data = await getApi(
      `${STATICS_API}/get?userid=${formData.id}&type=${formData.type}`,
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
