import apiService from "./Api";
import { AxiosResponse } from "axios";

// Example API function
export async function fetchData(api: any) {
  // console.log("apiapiapi::", api)
  try {
    const response = await apiService.get(api);
    // console.log("fetchData  RESSS::::", response)
    return { responseData: response.data, headers: response.headers };
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
// Example API function
export async function reelsLikeDislikeApi(api: string) {
  console.log("reelsLikeDislikeApiapiapiapi::", api);
  try {
    const response = await apiService.post(api);
    console.log("reelsLikeDislikeApiapiapiapi  RESSS::::", response);
    return response.data.message;
  } catch (error) {
    throw new Error(`error ${error}`);
  }
}

// Add Events API function
export async function addEventsApi(obj: any) {
  console.log("addEventsApi::", obj);
  try {
    const response = await apiService.post("/create-event", obj);
    console.log("addEventsApi   RESSS::::", response.data);
    return response.data;
  } catch (error) {
    console.log("addEventsApi   error:::", error);
    throw new Error(`Something went wrong ${error}`);
  }
}

// Update Events API function
export async function updateEventsApi(obj: any) {
  console.log("updateEventsApi::", obj);
  try {
    const response = await apiService.post("/edit-event", obj);
    console.log("updateEventsApi   RESSS::::", response.data);
    return response.data;
  } catch (error) {
    console.log("updateEventsApi   error:::", error);
    throw new Error(`Something went wrong ${error}`);
  }
}

// get day events API function
export async function getDayEventsApi(date: any, obj: any) {
  console.log("getDayEventsApi::", date, obj);
  try {
    const response = await apiService.get(
      `/get-particular-date-events?mobile_no=${obj.mobile_no}&date=${date}`
    );
    console.log("getDayEventsApi   RESSS::::", response.data);
    return response.data;
  } catch (error) {
    console.log("getDayEventsApi   error:::", error);

    throw new Error(`Something went wrong ${error}`);
    // return "Something went wrong";
  }
}

// get day events API function
export async function getMonthEventsApi(obj: any) {
  console.log("getMonthEventsApi::", obj);
  try {
    const response = await apiService.get(
      `/get-events-by-month/${obj.mobile_no}/${obj.month}`
    );
    console.log("getMonthEventsApi   RESSS::::", response.data);
    return response.data;
  } catch (error) {
    console.log("getMonthEventsApi   error:::", error);

    throw new Error(`Something went wrong ${error}`);
    // return "Something went wrong";
  }
}

// get day events API function
export async function deleteEventsApi(obj: any) {
  console.log("deleteEventsApi::", obj);
  try {
    const response = await apiService.post("/delete-event", obj);
    console.log("deleteEventsApi   RESSS::::", response.data);
    return response.data;
  } catch (error) {
    console.log("deleteEventsApi   error:::", error);
    throw new Error(`Something went wrong ${error}`);
    // return "Something went wrong";
  }
}

// Zoho API function
// export async function fetchZohoBalanceApi(api: any, customer_id: any) {
//     console.log("apiapiapi::", customer_id)
//     try {
//         const response = await apiService.get(api);
//         console.log("fetchData  RESSS::::", response)
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to fetch data');
//     }
// }

export async function fetchZohoBalanceApi(customer_id: string) {
  console.log("apiapiapi::", customer_id);
  try {
    const response = await apiService.get(
      `/get-zoho-customer?customer_id=${customer_id}`
    );
    console.log("fetchData RESSS::::", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchNotificationDataApi(userId: any) {
  try {
    const response = await apiService.get(`api/notifications/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}
// export async function fetchNotificationDataApi(mobile_no: number) {
//     try {
//         const response = await apiService.get(`/get-user-notifications?mobile_no=${mobile_no}`);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch data', error);
//         throw new Error('Failed to fetch data');
//     }
// }

export async function getZohoCustomerId(mobile_no: number) {
  try {
    const response = await apiService.get(
      `/get-zoho-customer-id?mobile_no=${mobile_no}`
    );
    if (response.status == 200) return response.data.zoho_customer_id;
    else return response.data.error;
  } catch (error) {
    return undefined;
    // console.error('Failed to getZohoCustomerId', error);
    // throw new Error('Failed to fetch data');
  }
}

export async function getZohoCustomerTransaction(id: any) {
  try {
    const response = await apiService.get(
      `/get-zoho-transactions?customer_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to getZohoCustomerTransaction", error);
    throw new Error("Failed to fetch data");
  }
}

export async function getShopProductsApi(
  type: string,
  tagName: string,
  priceRange: number,
  region: string
) {
  try {
    let url = `/api/products?productType=${type}`;
    if (tagName) {
      url += `&categories=["${tagName}"]`;
    }
    if (priceRange) {
      url += `&priceRange=${priceRange}&region=${region}`;
    }
    console.log("response==========", url);

    const response = await apiService.get(url);
    // console.log("response==========", url)
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data ${error}`);
  }
}
