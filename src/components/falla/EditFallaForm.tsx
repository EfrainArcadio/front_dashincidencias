// import EmpresaForm from "./EmpresaForm";
import { Link, useNavigate } from 'react-router-dom'
import { FallaFormData, Falla } from "@/types/index";
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import FallaForm from './FallaForm';
import { updateFalla } from '@/api/FallaAPI';

type EditFallaFormProps = {
  data: FallaFormData
  idFalla: Falla['_id']
}

export default function EditFallaForm({ data, idFalla }: EditFallaFormProps) {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: data.name,
      category: data.category
    }
  })
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: updateFalla,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['falla'] })
      queryClient.invalidateQueries({ queryKey: ['editFalla', idFalla] })
      toast.success(data)
      navigate('/fallas')
    }
  })
  const handleForm = (formData: FallaFormData) => {
    const data = {
      formData,
      idFalla
    }
    mutate(data)
  }
  return (
    <>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-gray-300 ">Editar: <span className='text-2xl'> {data.name}</span> </h1>
         <nav className="my-5 ">
          <Link
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/'
          >Volver al Catalogo</Link>
        </nav>

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
            value='Guardar Cambios'
            className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}