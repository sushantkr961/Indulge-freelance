import apiService from "../Api";
import { AxiosResponse } from "axios";

export async function getAllReferralsApi(referredBy: string): Promise<any> {
  try {    
    const response: AxiosResponse<any> = await apiService.get(
      `/api/referral/get-all?referredBy=${referredBy}`
    );
    console.log("getAllReferralsApi:: Response:", response);
    return response.data;
  } catch (error: any) {
    console.error("getAllReferralsApi:: Error:", error);
    if (error.response) {
      console.error(
        "getAllReferralsApi:: Server Response Error:",
        error.response.data
      );
      throw new Error(
        `Server error: ${error.response.data.message || "An error occurred"}`
      );
    } else if (error.request) {
      console.error("getAllReferralsApi:: No Response Error:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      console.error("getAllReferralsApi:: Request Setup Error:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
}

export async function updateReferralApi(
  mobileNo: string,
  data: { status: string; totalPrice: number; currency: string }
): Promise<any> {
  try {
    const response: AxiosResponse<any> = await apiService.put(
      `/referral/update/${mobileNo}`,
      data
    );
    console.log("updateReferralApi:: Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("updateReferralApi:: Error:", error);
    if (error.response) {
      console.error(
        "updateReferralApi:: Server Response Error:",
        error.response.data
      );
      throw new Error(
        `Server error: ${error.response.data.message || "An error occurred"}`
      );
    } else if (error.request) {
      console.error("updateReferralApi:: No Response Error:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      console.error("updateReferralApi:: Request Setup Error:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
}

export async function createReferralApi(data: {
  mobileNo: string;
}): Promise<any> {
  try {
    const response: AxiosResponse<any> = await apiService.post(
      `/referral/create`,
      data
    );
    console.log("createReferralApi:: Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("createReferralApi:: Error:", error);
    if (error.response) {
      console.error(
        "createReferralApi:: Server Response Error:",
        error.response.data
      );
      throw new Error(
        `Server error: ${error.response.data.message || "An error occurred"}`
      );
    } else if (error.request) {
      console.error("createReferralApi:: No Response Error:", error.request);
      throw new Error("No response from server. Please try again later.");
    } else {
      console.error("createReferralApi:: Request Setup Error:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
}
