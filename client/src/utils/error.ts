import { isAxiosError } from "axios";

export const getErrorMessage = (err: unknown) => {
  // if error is of type AxiosError, return message from response
  if (isAxiosError(err)) {
    return err?.response?.data?.message;
  }
  // if error is an instance of Error return error message
  if (err instanceof Error) {
    return err.message;
  }
};
