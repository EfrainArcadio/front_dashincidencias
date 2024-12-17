import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import EditFallaForm from "@/components/falla/EditFallaForm"
import { getFallaById } from "@/api/FallaAPI"

export default function EditFallaView(){
  const params = useParams()
  const idFalla = params.idFalla!
  const { data, isLoading,isError } = useQuery({
    queryKey: ['editFalla', idFalla],
    queryFn: () => getFallaById(idFalla),
    retry: false
  })
  if(isLoading) return 'Cargando'
  if(isError) return <Navigate to='/404' />
  if(data) return <EditFallaForm data={data} idFalla={idFalla} />
}