import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UserLoginForm } from "../types";

export async function createAccount(formData: UserLoginForm) {
  try {
    const url = '/auth/create-account'
    const { data } = await api.post(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }

  }
}
