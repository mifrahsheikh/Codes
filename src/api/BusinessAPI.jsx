import axios from "axios";

export const fetchNearbyBusinesses = async (lat, lng) => {
  const response = await axios.get("http://127.0.0.1:8000/api/nearby/", {
    params: { lat, lng },
  });
  return response.data;
};

export const addBusiness = async (businessData) => {
  const response = await axios.post("http://127.0.0.1:8000/apiadd/", businessData);
  return response.data;
};

export const deleteBusiness = async (id) => {
  await axios.delete("http://127.0.0.1:8000/api/business/delete/${id}/");
};
