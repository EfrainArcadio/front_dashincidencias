import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    name: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        reset()
    }
  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      {/* <h1 className="text-5xl font-black text-white">Crear Cuenta</h1> */}
      <p className="text-2xl font-light text-white mt-5">
        Llena el formulario para {''}
        <span className=" text-purple-500 font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-2 p-8  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl"
          >Apellido Paterno</label>
          <input
            type="firstName"
            placeholder="Apellido Paterno"
            className="w-full p-3  border-gray-300 border"
            {...register("firstName", {
              required: "El Apellido Paterno es obligatorio",
            })}
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl"
          >Apellido Materno</label>
          <input
            type="lastName"
            placeholder="Apellido Materno"
            className="w-full p-3  border-gray-300 border"
            {...register("lastName", {
              required: "El Apellido Materno es obligatorio",
            })}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl"
          >Phone</label>
          <input
            type="phone"
            placeholder="Número Telefonico"
            className="w-full p-3  border-gray-300 border"
            {...register("phone", {
              required: "El Telefono de usuario es obligatorio",
              minLength: {
                value: 10,
                message: 'El Telefono debe ser mínimo de 10 caracteres'
              }
            })}
          />
          {errors.phone && (
            <ErrorMessage>{errors.phone.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-2xl"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="bg-purple-600 hover:bg-purple-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
            <Link
                to={'/auth/login'}
                className="text-center text-gray-300 font-normal"
            >¿Ya tienes cuenta? Iniciar Sesión</Link>

            <Link
                to={'/auth/forgot-password'}
                className="text-center text-gray-300 font-normal"
            >¿Olvidaste tu contraseña? Reestablecer</Link>
      </nav>
    </>
  )
}