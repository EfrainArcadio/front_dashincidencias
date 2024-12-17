import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from "../ErrorMessage"
import { FallaFormData } from 'types'

type FallaFormProps = {
    register: UseFormRegister<FallaFormData>
    errors: FieldErrors<FallaFormData>
}

export default function FallaForm({errors, register} : FallaFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre de la Falla
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre de la Falla"
                    {...register("name", {
                        required: "El Nombre de la Falla es obligatorio",
                    })}
                />
                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}