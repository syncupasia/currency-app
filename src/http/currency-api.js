import api from "./api"

const resource = "/currencies"

export const getCurrencies = (iso_codes, base_currency = 'USD') => {
    return api.get(resource)
      .then(response => {
        // Handle the successful response here
        console.log("Successful response:", response.data);
        return response.data;
      })
      .catch(error => {
        // Handle the error response here
        console.error("Error response:", error);
        throw error;
      });
  };