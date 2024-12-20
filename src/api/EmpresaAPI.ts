import api from "@/lib/axios"
import { Integrador, dashboardIntegradorSchema,  CorredorFormData,  Corredor, userSchemaManager, User,  Empresa,  editEmpresaSchema, EmpresaFormData,  corredorSchema, dashboardCorredorSchema } from "../types"
import { isAxiosError } from "axios"

/** Integradores */
export async function createIntegrador(formData: EmpresaFormData) {
  try {
    const { data } = await api.post('/empresa/integrador', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function getIntegradores() {
  try {
    const { data } = await api('/empresa/integradores')
    const response = dashboardIntegradorSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
/** Corredores */
type CorredorAPIType = {
  formData: CorredorFormData
  empresaId: Corredor['_id']
}

export async function createCorredor({ formData, empresaId }: Pick<CorredorAPIType, 'formData' | 'empresaId'>) {
  try {
    const url = `/empresa/${empresaId}/corredor`
    const { data } = await api.post<string>(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

/** Generales */
export async function getEmpresaById(empresaId: Empresa['_id']) {
  try {
    const { data } = await api(`/empresa/${empresaId}`)
    const response = editEmpresaSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function getManagerByEmpresaId(empresaId: Integrador['_id']) {
  try {
    const { data } = await api(`/empresa/${empresaId}/manager`)
    const response = userSchemaManager.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getCorredoresByIdIntegrador(empresaId: Corredor['_id']) {
  try {
    const { data } = await api(`/empresa/integrador/${empresaId}`)
    const response = dashboardCorredorSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getFullCorredor(empresaId: Corredor['_id']) {
  try {
    const { data } = await api(`/empresa/corredor/${empresaId}`)
    const response = corredorSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
type EmpresaAPIType = {
  formData: EmpresaFormData
  empresaId: Empresa['_id']
}
export async function updateEmpresa({ formData, empresaId }: EmpresaAPIType) {
  try {
    const { data } = await api.put<string>(`/empresa/${empresaId}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function updateManager({ empresaId, id,account }: { empresaId: Corredor['_id'], id: User['_id'], account: User['account'] }) {
  console.log(id)
  console.log(empresaId)

  try {
    const url = `/empresa/${empresaId}/manager`
    const { data } = await api.put<string>(url, { id, account })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

