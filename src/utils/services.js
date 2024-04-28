import axios from "axios";

export const getApi = async (url, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
export const postApi = async (url, formDatas, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url, formDatas, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
export const putApi = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
export const deleteApi = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
