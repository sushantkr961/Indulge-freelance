import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const apiService = axios.create({
  baseURL: "https://indulgeconcierge.com", //'https://www.indulge.blokxlab.com',
  timeout: 10000,
});

// Add request interceptor
apiService.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check if there is an internet connection
    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );
    if (!isConnected) {
      throw new Error("No internet connection");
    }

    // Check if token is available
    const token = await AsyncStorage.getItem("token");
    console.log("Token::::", token);
    if (!token) {
      throw new Error("Token not found. Please login again");
    }

    // Add authorization header
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiService.interceptors.response.use(
  (response) => {
    // Modify response as needed
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default apiService;
