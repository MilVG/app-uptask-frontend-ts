import { isAxiosError } from "axios";
import { updateCurrentPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";

export async function updateProfile(formData: UserProfileForm) {
  try {

    const { data } = await api.put('/auth/profile', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function changePassword(formData: updateCurrentPasswordForm) {
  try {

    const { data } = await api.post('/auth/update-password', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}