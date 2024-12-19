import {   Empresa, TeamMember, TypeAccount, User, UserA } from "../types"

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

export const isManager = (managerId: Empresa['manager'], userId: TeamMember['_id']) => managerId === userId
export const isCreador = (creadorId: Empresa['createdBy'], userId: TeamMember['_id']) => creadorId === userId
export const TypeAccountVerify = (account: UserA['account'], admAccount: TypeAccount | undefined) => account === admAccount
export const isJUDCV = (email: User['email']  ) => email === adminEmail
