import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import { EmpresaFormData } from 'types'

type EmpresaFormProps = {
    register: UseFormRegister<EmpresaFormData>
    errors: FieldErrors<EmpresaFormData>
}

export default function EmpresaForm({errors, register} : EmpresaFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="empresaName" className="text-sm uppercase font-bold">
                    Nombre de la {}
                </label>
                <input
                    id="empresaName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre de la Empresa"
                    {...register("empresaName", {
                        required: "El Nombre de la Empresa es obligatorio",
                    })}
                />

                {errors.empresaName && (
                    <ErrorMessage>{errors.empresaName.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}