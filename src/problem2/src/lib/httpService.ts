import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import get from "lodash-es/get";

export class ApiError extends Error {
  message: string;
  status: number;
  data?: Object;

  constructor(message: string, status: number = 0, data?: Object) {
    super("");
    this.message = message;
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const HandleResponseError = <D>(
  error: AxiosError<{ message: string; data: Object }, D>
) => {
  if (typeof error?.response?.data?.message === "string") {
    throw new ApiError(
      error.response.data.message,
      error.response?.status,
      error?.response?.data?.data
    );
  }

  throw new ApiError("Unknown", 400);
};

class HttpRestService {
  private axiosInstance: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async get<R>(route: string, configs?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance
      .get(route, configs)
      .then((data) => get(data, "data"))
      .catch(HandleResponseError);
  }

  async post<P, R>(
    route: string,
    payload: P,
    configs?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance
      .post(route, payload, configs)
      .then((data) => get(data, "data"))
      .catch(HandleResponseError);
  }

  async patch<P, R>(
    route: string,
    payload: P,
    configs?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance
      .patch(route, payload, configs)
      .then((data) => get(data, "data"))
      .catch(HandleResponseError);
  }

  async put<P, R>(
    route: string,
    payload: P,
    configs?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance
      .put(route, payload, configs)
      .then((data) => get(data, "data"))
      .catch(HandleResponseError);
  }

  async delete<R>(route: string, configs?: AxiosRequestConfig): Promise<R> {
    return this.axiosInstance
      .delete(route, configs)
      .then((data) => get(data, "data"))
      .catch(HandleResponseError);
  }
}

export const InstanceAxios: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpRestService = new HttpRestService(InstanceAxios);
