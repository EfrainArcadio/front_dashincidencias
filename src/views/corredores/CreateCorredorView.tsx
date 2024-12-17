import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import EmpresaForm from "@/components/empresas/EmpresaForm"
import { CorredorFormData } from "@/types/index"
import { createCorredor } from "@/api/EmpresaAPI"

export default function CreateCorredorView() {

  const navigate = useNavigate()
  const params = useParams()
  const empresaId = params.empresaId!
  const initialValues: CorredorFormData = {
    empresaName: "",
    perfil: "Corredor"
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createCorredor,
    onError: (error) => {
      if (error.message.length != 0) {
        console.log(error.message)
        toast.error(error.message)
      }
      toast.error('Error Inesperado')
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['empresa', empresaId] })
      toast.success(data)
      navigate(`/integrador/${empresaId}`)
    }
  })

  const handleForm = (formData: CorredorFormData) => {
    const data = {
      formData,
      empresaId
    }
    mutate(data)
  }
  // console.log(register)
  return (
    <>
      <div className="max-w-3xl mx-auto">
        {/* <h1 className="text-5xl font-black text-white">C</h1> */}
        <p className="text-2xl font-light text-gray-500 mt-5">Crear Corredor</p>

        <nav className="my-5 ">
          <Link
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/'
          >Volver a Inicio</Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <EmpresaForm
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
