import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { TypeAccountVerify } from "@/utils/policies";
import { useMemo } from "react";
import { getFullCorredor } from "@/api/EmpresaAPI";

export default function CorredorDetailsView() {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const params = useParams();
  const empresaId = params.empresaId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["empresa", empresaId],
    queryFn: () => getFullCorredor(empresaId),
    retry: false,
  });
  console.log(data)
  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);
  if (isLoading && authLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data && user)
    return (
      <>
        <nav className="my-5 flex gap-3">
          {TypeAccountVerify( user?.account, "Administrador") && (
            <>
              <Link
                className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to={`manager`}
              >
                Agregar Manager
              </Link>
              <Link
                to={"unidades"}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              >
                Unidades
              </Link>
            </>
          )}
          {TypeAccountVerify( user?.account, "Integrador") && (
            <>
              <Link
                className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to={"team"}
              >
                Asignar Tecnico
              </Link>
            </>
          )}
          {TypeAccountVerify( user?.account, "Corredor") && (
            <>
              <Link
                className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to={"team"}
              >
                Asignar Supervisor
              </Link>
            </>
          )}
          {TypeAccountVerify( user?.account, "Supervisor") && (
            <>
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate(location.pathname + '?newTask=true')}
                    >Agregar Incidencia</button>
            </>
          )}
        </nav>

        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
