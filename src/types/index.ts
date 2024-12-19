import { z } from 'zod'
export const typeAccountSchema = z.enum(["Administrador", "General", "Integrador", "Corredor", "Tecnico", "Supervisor"])
export type TypeAccount = z.infer<typeof typeAccountSchema>

/** Auth & Users */
const authSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  account: typeAccountSchema,
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  empresa: z.string(),
  token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'firstName' | 'lastName' | 'phone' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type CheckPasswordForm = Pick<Auth, 'password'>

/** Users */
export const userSchema = authSchema.pick({
  name: true,
  firstName: true,
  lastName: true,
  account: true,
  email: true,
  empresa: true
}).extend({
  _id: z.string()
})
export const userTaskSchema = authSchema.pick({
  name: true,
  email: true,
}).extend({
  _id: z.string()
})
export const userSchemaAuth = authSchema.pick({
  name: true,
  email: true,
  account: true,
  empresa: true
}).extend({
  _id: z.string()
})
export const userSchemaManager = authSchema.pick({
  name: true,
  firstName: true,
  lastName: true,
  email: true,
  account: true
}).extend({
  _id: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserA = z.infer<typeof userSchemaManager>
export type UserAccount = z.infer<typeof userSchemaAuth>
export type UserProfileForm = Pick<User, 'name' | 'email'>
export type idUser = Pick<User, '_id' >

/** Notes */
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string()
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/** Fallas */

export const fallaCategorySchema = z.enum(["otra", "hardware", "software", "red"])
export type FallaCategory = z.infer<typeof fallaCategorySchema>

export const fallaSchema = z.object({
  _id: z.string(),
  category: fallaCategorySchema,
  name: z.string()
})

export const dashboardFallaSchema = z.array(
  fallaSchema.pick({
    _id: true,
    name: true
  })
)

export const fallaTaskSchema = fallaSchema.pick({
  _id: true,
  category: true,
  name: true
})

export type Falla = z.infer<typeof fallaSchema>
export type FallaFormData = Pick<Falla, 'category' | 'name'>
export type FallaTask = z.infer<typeof fallaTaskSchema>
/** Empresas */
export const perfilEmpresaSchema = z.enum(["Corredor", "Integrador"])
export type PerfilEmpresa = z.infer<typeof perfilEmpresaSchema>

export const empresaSchema = z.object({
  _id: z.string(),
  empresaName: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  createdBy: z.string(userSchema.pick({ _id: true })),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
  perfil: perfilEmpresaSchema
})
export const getIdEmpresa = empresaSchema.pick({
  _id: true
})
export const editEmpresaSchema = empresaSchema.pick({
  empresaName: true,
  perfil: true
})

export type Empresa = z.infer<typeof empresaSchema>
export type EmpresaFormData = Pick<Empresa, 'empresaName' | 'perfil'>


/** Unidad */
export const unidadSchema = z.object({
  _id: z.string(),
  economico: z.string(),
  empresa: z.string(empresaSchema.pick({ _id: true })),
  active: z.boolean()
})
export const dashboardUnidadSchema = z.array(
  unidadSchema.pick({
    _id: true,
    economico: true,
    active: true
  })
)
export const editUnidadSchema = unidadSchema.pick({
  economico: true
})
export type Unidad = z.infer<typeof unidadSchema>
export type UnidadFormData = Pick<Unidad, 'economico'>

/** Tasks Status */
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

/** Empresa */
export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(fallaSchema.pick({ name: true })),
  description: z.string(),
  corredor: z.string(empresaSchema.pick({ _id: true })),
  unidad: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(z.object({
    _id: z.string(),
    user: userTaskSchema,
    status: taskStatusSchema
  })),
  notes: z.array(noteSchema.extend({
    createdBy: userTaskSchema
  })),
  createdAt: z.string(),
  updatedAt: z.string()
})
export const taskCorredorSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
  unidad: true,
  corredor: true
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description' | 'unidad'>
export type TaskCorredor = z.infer<typeof taskCorredorSchema>
/** Empresa - Integrador */

export const integradorSchema = z.object({
  _id: z.string(),
  empresaName: z.string(),
  createdBy: z.string(userSchema.pick({ _id: true })),
  perfil: perfilEmpresaSchema,
  manager: z.string(userSchema.pick({ _id: true })),
  workSpace: z.array(z.string(empresaSchema.pick({ _id: true }))),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
})

export const dashboardIntegradorSchema = z.array(
  integradorSchema.pick({
    _id: true,
    workSpace: true,
    empresaName: true,
    createdBy: true,
    manager: true
  })
)

export type Integrador = z.infer<typeof integradorSchema>
export type EditIntegradorFormData = Pick<Integrador, 'empresaName'>

/** Corredor */
export const corredorSchema = z.object({
  _id: z.string(),
  empresaName: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
  tasks: z.array(taskCorredorSchema),
  workSpace: z.array(z.string(unidadSchema.pick({ _id: true }))),
  createdBy: z.string(userSchema.pick({ _id: true })),
  perfil: perfilEmpresaSchema
})

export const dashboardCorredorSchema = z.array(
  corredorSchema.pick({
    _id: true,
    empresaName: true,
    manager: true,
    tasks: true,
    workSpace: true,
    createdBy: true,
  })
)

export const editcorredorSchema = corredorSchema.pick({
  empresaName: true
})

export type Corredor = z.infer<typeof corredorSchema>
export type CorredorFormData = Pick<Integrador, 'empresaName' | 'perfil'>

/** Team */
const teamMemberSchema = userSchema.pick({
  name: true,
  firstName: true,
  email: true,
  account: true,
  _id: true
})

export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>