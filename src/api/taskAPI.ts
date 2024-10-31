import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
  formData: TaskFormData
  projectId: Project['_id']
  taskId: Task['_id']
  status: Task['status']
}
export async function createTask({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) {

  try {

    const url = `/projects/${projectId}/tasks`
    const { data } = await api.post(url, formData)
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
interface ErrorResponse {
  errors: ValidationError[];
}
export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api.get(url)
    const response = taskSchema.safeParse(data)
    if (response) {
      return response.data
    }
  } catch (error) {

    if (isAxiosError(error) && error.response) {

      const errorData = error.response.data as ErrorResponse
      if (errorData.errors && Array.isArray(errorData.errors)) {

        const errorMessage = errorData.errors.map(err => err.msg).join(', ')
        throw new Error(errorMessage)

      } else if (error.response.data.error) {
        throw new Error(error.response.data.error)
      } else {
        throw new Error("Error de Respuesta de Servidor")
      }
    } else {

      throw new Error("errror Desconocido al obtener la tarea")
    }
  }
}
export async function updateTask({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api.put(url, formData)
    return data
  } catch (error) {

    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)

    }
  }
}
export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`
    const { data } = await api.delete(url)
    return data
  } catch (error) {

    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`
    const { data } = await api.patch(url, { status })
    return data
  } catch (error) {

    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error)
    }
  }
}
