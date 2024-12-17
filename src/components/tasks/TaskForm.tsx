import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import { fallasIncidencias } from "@/locales/es";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUnidadesByIdCorredor } from "@/api/UnidadAPI";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {

    const params = useParams()
    const empresaId = params.empresaId!
    
    const { data } = useQuery({
      queryKey: ['unidad', empresaId],
      queryFn: () => getUnidadesByIdCorredor(empresaId),
      retry: false
    })
    // console.log(data)
    // console.log(isLoading)

    return (
      <>
        {/* <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="name">
            Nombre de la tarea
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre de la tarea"
            className="w-full p-3  border-gray-300 border"
            {...register("name", {
              required: "El nombre de la tarea es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div> */}

        <div className="my-5 space-y-3">
          <label className="font-normal text-2xl">Falla:</label>
          <select
            className="w-full p-3 bg-white border border-gray-300"
            // defaultValue={fallasIncidencias}
            // onChange={handleChange}
            {...register("name", {
                required: "El Nombre de la Falla es obligatoria",
              })}
          >
            {Object.entries(fallasIncidencias).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="description">
            Descripción de la tarea
          </label>
          <textarea
            id="description"
            placeholder="Descripción de la tarea"
            className="w-full p-3  border-gray-300 border"
            {...register("description", {
              required: "La descripción de la tarea es obligatoria",
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
        <div className="my-5 space-y-3">
          <label className="font-normal text-2xl">Unidad:</label>
          <select
            className="w-full p-3 bg-white border border-gray-300"
            // defaultValue={data.status}
            // onChange={handleChange}
            {...register("unidad", {
                required: "La unidad de la Falla es obligatoria",
              })}
          >
            {data?.map((unidad) => (
                <option key={unidad._id} value={unidad.economico}>
                {unidad.economico}
              </option>
            ))
        
            }

          </select>
          {errors.unidad && (
            <ErrorMessage>{errors.unidad.message}</ErrorMessage>
          )}
        </div>
      </>
    );
}