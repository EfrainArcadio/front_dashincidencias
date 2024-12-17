import {   Empresa, TeamMember, TypeAccount, UserA } from "../types"

export const isManager = (managerId: Empresa['manager'], userId: TeamMember['_id']) => managerId === userId
export const isCreador = (creadorId: Empresa['createdBy'], userId: TeamMember['_id']) => creadorId === userId
export const TypeAccountVerify = (account: UserA['account'], admAccount: TypeAccount | undefined) => account === admAccount
