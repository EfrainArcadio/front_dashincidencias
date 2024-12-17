import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Corredor, TeamMember, TeamMemberForm, teamMembersSchema } from "../types";

export async function findUserByEmail({ empresaId, formData }: { empresaId: Corredor['_id'], formData: TeamMemberForm }) {
  try {
    const url = `/empresa/${empresaId}/team/find`
    const { data } = await api.post(url, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function addUserToProject({ empresaId, id}: { empresaId: Corredor['_id'], id: TeamMember['_id'] }) {

  try {
    const url = `/empresa/${empresaId}/team`
    const { data } = await api.post<string>(url, { id })
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function removeUserFromProject({ empresaId, userId }: { empresaId: Corredor['_id'], userId: TeamMember['_id'] }) {
  try {
    const url = `/empresa/${empresaId}/team/${userId}`
    const { data } = await api.delete<string>(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjectTeam(empresaId: Corredor['_id']) {
  try {
    const url = `/empresa/${empresaId}/team`
    const { data } = await api(url)
    const response = teamMembersSchema.safeParse(data)
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

