import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import { UnidadFormData } from 'types'

type UnidadFormProps = {
    register: UseFormRegister<UnidadFormData>
    errors: FieldErrors<UnidadFormData>
}

export default function UnidadForm({errors, register} : UnidadFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="economico" className="text-sm uppercase font-bold">
                    Economico de la Unidad
                </label>
                <input
                    id="economico"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Economico de la Unidad"
                    {...register("economico", {
                        required: "El Economico de la Unidad es obligatorio",
                    })}
                />

                {errors.economico && (
                    <ErrorMessage>{errors.economico.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}