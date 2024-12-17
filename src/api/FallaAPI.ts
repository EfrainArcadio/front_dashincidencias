import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { dashboardFallaSchema, Falla, FallaFormData, fallaSchema } from "../types"

export async function createFalla(formData: FallaFormData) {
  try{
    const { data } = await api.post('/falla',formData)
    return data
  } catch ( error ) {
    if (isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function getFallas() {
  try {
    const {data} = await api('/falla')
    const response = dashboardFallaSchema.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function getFallaById(idFalla: Falla['_id']) {
  try {
    const { data } = await api(`/falla/${idFalla}` )
    const response = fallaSchema.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}
type FallaAPIType = {
  formData: FallaFormData
  idFalla: Falla['_id']
}
export async function updateFalla({ formData, idFalla }: FallaAPIType) {
  try {
    const { data } = await api.put<string>(`/falla/${idFalla}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}