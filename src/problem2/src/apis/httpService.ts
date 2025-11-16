import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import get from "lodash-es/get";

const BASE_URL = "https://interview.switcheo.com"; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // You can add authorization headers or other configurations here
  return config;
});

const ErrorHandler = (error: any) => {
  // Handle errors globally
  console.error("HTTP Error:", error);
  throw error;
};

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get<T>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then((response) => get(response, "data"))
      .catch(ErrorHandler);
  }

  post<T>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then((response) => get(response, "data"))
      .catch(ErrorHandler);
  }

  // Add other HTTP methods (put, delete, etc.) as needed
}

const httpService = new HttpService(axiosInstance);

export { axiosInstance };

export default httpService;
