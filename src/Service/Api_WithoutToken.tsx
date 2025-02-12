import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const apiService_WithoutToken = axios.create({
  baseURL: "https://indulgeconcierge.com",//'https://www.indulge.blokxlab.com',
  timeout: 10000,
});

// Add request interceptor
apiService_WithoutToken.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Check if there is an internet connection
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
    if (!isConnected) {
      throw new Error('No internet connection');
    }

    // Check if token is available
    // const token = await AsyncStorage.getItem('token');
    // console.log("Token::::", token)
    // if (!token) {
    //   throw new Error('Token not found. Please login again');
    // }

    // Add authorization header
    // config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI3YjA3MWVlZjU3N2UyOTYyNzI2YjYiLCJpYXQiOjE3MjQ5MTIyMTd9.e4RSgcnMtqy3lwHDZr2A3z8eaJHG5TqBhoYJCuS7zH8`;

    return config;
  },
  (error) => {
    console.log("errorerror====error", error)
    return Promise.reject(error);
  }
);

// Add response interceptor
apiService_WithoutToken.interceptors.response.use(
  (response) => {
    // Modify response as needed
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default apiService_WithoutToken;
