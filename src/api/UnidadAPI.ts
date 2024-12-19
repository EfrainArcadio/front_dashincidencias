import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Corredor, dashboardUnidadSchema, Unidad, UnidadFormData, unidadSchema } from "../types"

type UnidadAPI = {
  formData: UnidadFormData
  empresaId: Corredor['_id']
}

export async function createUnidad({formData, empresaId}: Pick<UnidadAPI,'formData'| 'empresaId'>) {
  try{
    const url = `/unidad/${empresaId}`
    const { data } = await api.post<string>(url ,formData)
    return data
  } catch ( error ) {
    if (isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUnidadById(idUnidad: Unidad['_id']) {
  try {
    const { data } = await api<string>(`/unidad/${idUnidad}`)
    const response = unidadSchema.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}
export async function getUnidadesByIdCorredor(id: Corredor['_id']) {
  try {
    const {data} = await api(`/unidad/corredor/${id}`)
    const response = dashboardUnidadSchema.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}
export async function deleteUnidad(idUnidad: Unidad['_id']) {
  console.log(idUnidad)
  try {
    const url = `/unidad/${idUnidad}`
    const { data } = await api.put<string>(url)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}