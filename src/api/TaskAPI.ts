import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Corredor, Task, TaskFormData, taskSchema } from "../types";

type TaskAPI = {
  formData: TaskFormData
  empresaId: Corredor['_id']
  taskId: Task['_id']
  status: Task['status']
}

export async function createTask({ formData, empresaId }: Pick<TaskAPI, 'formData' | 'empresaId'>) {
  try {
    const url = `/empresa/${empresaId}/tasks`
    const { data } = await api.post<string>(url, formData)
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getTaskById({ empresaId, taskId }: Pick<TaskAPI, 'empresaId' | 'taskId'>) {
  try {
    const url = `/empresa/${empresaId}/tasks/${taskId}`
    const { data } = await api(url)
    console.log(data)
    const response = taskSchema.safeParse(data)
    console.log(response)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateTask({ empresaId, taskId, formData }: Pick<TaskAPI, 'empresaId' | 'taskId' | 'formData'>) {
  try {
    const url = `/empresa/${empresaId}/tasks/${taskId}`
    const { data } = await api.put<string>(url, formData)
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteTask({ empresaId, taskId }: Pick<TaskAPI, 'empresaId' | 'taskId'>) {
  try {
    const url = `/empresa/${empresaId}/tasks/${taskId}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateStatus({ empresaId, taskId, status }: Pick<TaskAPI, 'empresaId' | 'taskId' | 'status'>) {
  try {
    const url = `/empresa/${empresaId}/tasks/${taskId}/status`
    const { data } = await api.post<string>(url, { status })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}