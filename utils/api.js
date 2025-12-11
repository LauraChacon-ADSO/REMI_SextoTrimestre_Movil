import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.0.5:5059/api", 
  timeout: 8000,
});

// Interceptor para añadir el token en cada request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token"); //guardas el token en login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
