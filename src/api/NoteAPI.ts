import { isAxiosError } from "axios";
import { Note, NoteFormData, Corredor, Task } from "../types";
import api from "@/lib/axios";

type NoteAPIType = {
  formData: NoteFormData
  empresaId: Corredor['_id']
  taskId: Task['_id']
  noteId: Note['_id']
}

export async function createNote({ empresaId, taskId, formData }: Pick<NoteAPIType, 'empresaId' | 'taskId' | 'formData'>) {
  try {
    console.log(empresaId)
    const url = `/empresa/${empresaId}/tasks/${taskId}/notes`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteNote({ empresaId, taskId, noteId }: Pick<NoteAPIType, 'empresaId' | 'taskId' | 'noteId'>) {
  try {
    const url = `/empresa/${empresaId}/tasks/${taskId}/notes/${noteId}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}