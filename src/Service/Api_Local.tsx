import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const apiServiceLocal = axios.create({
  baseURL: "https://20nfbnm5-8000.inc1.devtunnels.ms",//'https://www.indulge.blokxlab.com',
  timeout: 10000,
});

// Add request interceptor
apiServiceLocal.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // Check if there is an internet connection
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
    if (!isConnected) {
      throw new Error('No internet connection');
    }

    // Check if token is available
    const token = await AsyncStorage.getItem('token');
    console.log("Token::::", token)
    if (!token) {
      throw new Error('Token not found. Please login again');
    }

    // Add authorization header
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log("======>", config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiServiceLocal.interceptors.response.use(
  (response) => {
    // Modify response as needed
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);
console.log("apiServiceLocal=======", apiServiceLocal)
export default apiServiceLocal;
