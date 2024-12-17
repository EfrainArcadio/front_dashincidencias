import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query'
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="
        bg-no-repeat bg-cover bg-center bg-[url('/cord.png')]
        m-auto mt-5 rounded-md max-w-2xl h-[75vh] p-5 bg-[rgba(173,175,179,0.3)] backdrop-blur shadow
        space-y-20"
        noValidate
      >
        <div className="space-y-3">
          <div className="flex flex-col gap-5">

            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="mt-2 block w-full p-3 placeholder:text-ortgray-950 
              bg-[rgba(220,220,221,0.55)] border-2 border-ortindig-700
              focus:bg-[rgba(103,104,105,0.6)] focus:outline-ortindig-800 focus:shadow-outline 
              focus:placeholder:text-white 
              backdrop-blur-sm rounded-md"
              {...register("email", {
                required: "El Email es obligatorio",
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
          <div className="flex flex-col gap-5">
            <input
              type="password"
              placeholder="Password de Registro"
              className="mt-2 block w-full p-3 placeholder:text-ortgray-950 
              bg-[rgba(220,220,221,0.55)] border-2 border-ortindig-700
              focus:bg-[rgba(103,104,105,0.6)] focus:outline-ortindig-800 focus:shadow-outline 
              focus:placeholder:text-white 
              backdrop-blur-sm rounded-md"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="mt-4 p-2 w-full 
      bg-[rgba(220,220,221,0.55)] backdrop-blur-sm
      border-ortindig-700 border-2
      text-ortgray-950 font-bold 
      hover:bg-ortindig-700 hover:text-white
      text-lg cursor-pointer rounded"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
            <Link
                to={'/auth/register'}
                className="text-center text-gray-300 font-normal"
            >¿No tienes cuenta? Crear Una</Link>

            <Link
                to={'/auth/forgot-password'}
                className="text-center text-gray-300 font-normal"
            >¿Olvidaste tu contraseña? Reestablecer</Link>
      </nav>
    </>
  )
}