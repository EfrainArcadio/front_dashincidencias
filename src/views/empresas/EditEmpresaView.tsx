import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getEmpresaById } from "@/api/EmpresaAPI"
import EditEmpresaForm from "@/components/empresas/EditEmpresaForm"

export default function EditEmpresaView(){
  const params = useParams()
  const empresaId = params.empresaId!
  const { data, isLoading,isError } = useQuery({
    queryKey: ['editEmpresa', empresaId],
    queryFn: () => getEmpresaById(empresaId),
    retry: false
  })
  if(isLoading) return 'Cargando'
  if(isError) return <Navigate to='/404' />
  if(data) return <EditEmpresaForm data={data} empresaId={empresaId} />

}