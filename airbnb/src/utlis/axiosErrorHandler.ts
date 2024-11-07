// utils/axiosErrorHandler.ts
import { AxiosError } from "axios";

// This function helps to handle Axios errors
export function handleAxiosError(error: AxiosError): string {
  if (error.response) {
    // Server responded with a status other than 2xx

    const errorMessage = (error.response.data as { message?: string })?.message || "An error occurred on the server.";
    return errorMessage;
  } else if (error.request) {
    // No response was received from the server
    return "No response from the server. Please check your network connection.";
  } else {
    // Something went wrong in setting up the request
    return "An unexpected error occurred while setting up the request.";
  }

}
export default handleAxiosError;