import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (typeof window !== "undefined") {
      if (status === 404) {
        // Graceful handling: notify once and let callers render empty states.
        toast.error("The requested resource was not found.", { id: "http-404" });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
