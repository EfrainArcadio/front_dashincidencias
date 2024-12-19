import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AddManagerModal from "@/components/empresas/AddManagerModal";
import { getManagerByEmpresaId } from "@/api/EmpresaAPI";

const AddManagerCorredor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const empresaId = params.empresaId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["empresa", empresaId],
    queryFn: () => getManagerByEmpresaId(empresaId),
    retry: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return (
      <>
        <nav className="my-5 flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:justify-between text-center">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(location.pathname + "?updateManager=true")}
          >
            Cambiar Manager
          </button>
          <Link
            to={`/corredor/${empresaId}`}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver al Corredor
          </Link>
        </nav>
        <h2 className="text-3xl text-gray-300 font-black my-10 text-center">
          Manager actual
        </h2>
        {data ? (
          <ul role="list" className="flex justify-center">
            <li
              key={data._id}
              className="flex justify-between gap-x-4 px-3 py-5 bg-white divide-gray-100 border border-gray-100 mt-2 shadow-white shadow-sm w-[280px] ms:w-[300px] md:w-[310px ] lg:w-[320px] xl:w-[330px]"
            >
              <div className="space-y-2">
                <p className="text-2xl font-black text-gray-600">
                  {data.name + " " + data.firstName + " " + data.lastName}
                </p>
                <p className="text-sm text-gray-400">{data.email}</p>
              </div>
            </li>
          </ul>
        ) : (
          <p className="text-center py-20">No hay miembros en este equipo</p>
        )}

        <AddManagerModal />
      </>
    );
};

export default AddManagerCorredor;
