

export function handleAxiosError(error: any): string {
  if (error.response) {
    const errorMessage = (error.response.data as { message?: string })?.message || "An error occurred on the server.";
    return errorMessage;
  } else if (error.request) {
    return "No response from the server. Please check your network connection.";
  } else {
    return "An unexpected error occurred while setting up the request.";
  }
}

export default handleAxiosError;
