import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import EmpresaForm from "@/components/empresas/EmpresaForm"
import { EmpresaFormData } from "@/types/index"
import { createIntegrador } from "@/api/EmpresaAPI"

export default function CreateIntegradorView() {

    const navigate = useNavigate()
    const initialValues : EmpresaFormData = {
      empresaName: "",
      perfil: 'Integrador'
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createIntegrador,
        onError: (error) => {
            if (error.message.length != 0) {
                // console.log(error.message)
                toast.error(error.message)
              }
              toast.error('Error Inesperado')
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData : EmpresaFormData) => mutate(formData)

    return (
        <>
            <div className="max-w-3xl mx-auto">
                {/* <h1 className="text-5xl font-black text-white">C</h1> */}
                <p className="text-2xl font-light text-gray-500 mt-5">Crear Empresa</p>

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
