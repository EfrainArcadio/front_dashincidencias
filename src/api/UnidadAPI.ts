import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Corredor, dashboardUnidadSchema, Unidad, UnidadFormData, unidadSchema } from "../types"

type UnidadAPI = {
  formData: UnidadFormData
  empresaId: Corredor['_id']
}

export async function createUnidad({formData, empresaId}: Pick<UnidadAPI,'formData'| 'empresaId'>) {
  // console.log(empresaId)
  try{
    const url = `/unidad/${empresaId}`
    const { data } = await api.post<string>(url ,formData)
    // console.log(data)
    return data
  } catch ( error ) {
    if (isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUnidadById(idUnidad: Unidad['_id']) {
  // console.log(idUnidad)
  try {
    const { data } = await api<string>(`/unidad/${idUnidad}`)
    // console.log(data)
    const response = unidadSchema.safeParse(data)
    if(response.success){
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}
export async function getUnidadesByIdCorredor(id: Corredor['_id']) {
  // console.log(id)
  try {
    const {data} = await api(`/unidad/corredor/${id}`)
    // console.log(data)
    const response = dashboardUnidadSchema.safeParse(data)
    // console.log(response)
    if(response.success){
      return response.data
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
    }
  }
}