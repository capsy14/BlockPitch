import axios from "axios";

export const fetchStartupData = async () => {
  try {
    const response = await axios.get("/api/startupdata/route", {
      withCredentials: true, // Important to send cookies (auth-token)
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching startup data:", error.response?.data || error.message);
    throw error;
  }
};
