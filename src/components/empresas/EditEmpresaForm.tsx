import EmpresaForm from "./EmpresaForm";
import { Link, useNavigate } from 'react-router-dom'
import { Integrador, EmpresaFormData } from "@/types/index";
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEmpresa } from "@/api/EmpresaAPI";
import { toast } from 'react-toastify'

type EditIntegradorFormProps = {
  data: EmpresaFormData
  empresaId: Integrador['_id']
}

export default function EditEmpresaForm({ data, empresaId }: EditIntegradorFormProps) {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      empresaName: data.empresaName,
      perfil: data.perfil
    }
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateEmpresa,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['empresa'] })
      queryClient.invalidateQueries({ queryKey: ['editEmpresa', empresaId] })
      toast.success(data)
      navigate('/')
    }
  })
  const handleForm = (formData: EmpresaFormData) => {
    const data = {
      formData,
      empresaId
    }
    mutate(data)
  }
  return (
    <>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-black text-gray-300 ">Editar {data.perfil}</h1>
         <nav className="my-5 ">
          <Link
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/'
          >Volver a {data.perfil}es</Link>
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
            value='Guardar Cambios'
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}