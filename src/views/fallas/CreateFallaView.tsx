import {  useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { FallaFormData } from "@/types/index"
import { createFalla } from "@/api/FallaAPI"
import { useMutation } from "@tanstack/react-query"
import FallaForm from "@/components/falla/FallaForm"

// const handleForm = (formData : IntegradorFormData) => mutate(formData)

const CreateFallaView = () => {
  const navigate = useNavigate()
  const initialValues : FallaFormData = {
    category: "otra",
    name: ""
  }

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const {mutate} = useMutation({
      mutationFn: createFalla,
      onError: (error) => {
          console.log(error.message)
          toast.error(error.message)
      },
      onSuccess: (data) => {
          toast.success(data)
          navigate('/fallas')
      }
  })
  
  const handleForm = (formData : FallaFormData) => mutate(formData)

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {/* <h1 className="text-5xl font-black text-white">C</h1> */}
        <p className="text-2xl font-light text-gray-500 mt-5">Crear Falla</p>
{/* 
        <nav className="my-5 ">
          <Link
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/'
          >Volver a Inicio</Link>
        </nav> */}

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <FallaForm
            register={register}
            errors={errors}
          />

          <input
            type="submit"
            value='Crear Empresa'
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}

export default CreateFallaView
