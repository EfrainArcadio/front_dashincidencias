import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
// import EmpresaForm from "@/components/empresas/EmpresaForm"
import { UnidadFormData } from "@/types/index"
import { createUnidad } from "@/api/UnidadAPI"
import UnidadForm from "@/components/unidad/UnidadForm"



export default function CreateUnidadView() {

  const navigate = useNavigate()
  const params = useParams()
  // console.log(params)
  const empresaId = params.empresaId!
  // console.log(empresaId)
  const initialValues: UnidadFormData = {
    economico: ""
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: createUnidad,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['unidad', empresaId] })
      toast.success(data)
      navigate(`/corredor/${empresaId}/unidades`)
    }
  })

  const handleForm = (formData: UnidadFormData) => {
    const data = {
      formData,
      empresaId
    }
    mutate(data)
  }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {/* <h1 className="text-5xl font-black text-white">C</h1> */}
        <p className="text-2xl font-light text-gray-500 mt-5">Asignar Unidad</p>

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
          <UnidadForm
            register={register}
            errors={errors}
          />

          <input
            type="submit"
            value='Crear Unidad'
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}
