import api from "./api";

const resource = "/currencies";

export const queryCurrencies = async (additionalParams = {}, additionalUri = "") => {

  const fullUri = (additionalUri.length > 0) ? `${resource}/${additionalUri}` : resource; 

  try {
    const response = await api.get(fullUri, { params: additionalParams });
    // Handle the successful response here
    console.log("Successful response:", response.data);
    return response.data;
  } catch (error) {
    // Handle the error response here
    console.log("Error response:", error);
    throw error;
  }
};