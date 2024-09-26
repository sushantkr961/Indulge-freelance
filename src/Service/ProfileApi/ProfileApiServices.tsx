import apiService from "../Api";
import { AxiosResponse } from "axios";

export async function getProfileDetailsApi(mobile_no: any): Promise<any> {
  try {
    const response: AxiosResponse<any> = await apiService.get(
      `/get-profile-details?mobile_no=${mobile_no}`
    );
    console.log("getProfileDetailsApi:: Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("getProfileDetailsApi:: Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "getProfileDetailsApi:: Server Response Error:",
        error.response.data
      );
      throw new Error(
        `Server error: ${error.response.data.message || "An error occurred"}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("getProfileDetailsApi:: No Response Error:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(
        "getProfileDetailsApi:: Request Setup Error:",
        error.message
      );
      throw new Error(`Error: ${error.message}`);
    }
  }
}
export async function getUserDetailsApi(mobile_no: any): Promise<any> {
  try {
    const response: AxiosResponse<any> = await apiService.get(
      `/get-user?mobile_no=${mobile_no}`
    );
    // console.log("getUserDetailsApi:: Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("getUserDetailsApi:: Error:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        "getUserDetailsApi:: Server Response Error:",
        error.response.data
      );
      throw new Error(
        `Server error: ${error.response.data.message || "An error occurred"}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("getUserDetailsApi:: No Response Error:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("getUserDetailsApi:: Request Setup Error:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
}
