import toast from "react-hot-toast";
import { STATICS_API } from "../API";
import { getApi } from "../utils/services";
import { getDecryptedCookie } from "../utils/EncryptCookie";

export const GetStaticsByType = async (formData) => {
  const cookie = getDecryptedCookie("accountBook_userData");
  const cachedData = cookie ? JSON.parse(cookie) : false;
  if (cachedData) {
    try {
      const data = await getApi(
        `${STATICS_API}/get?userid=${cachedData._id}&type=${formData.queryKey[1].type}`,
        cachedData.accessToken
      );
      if (data.status == "ok") {
        return data.data;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      console.log(error, "GetStaticsErr");
    }
  } else {
    toast.error("Un-authorized");
    return null;
  }
};
