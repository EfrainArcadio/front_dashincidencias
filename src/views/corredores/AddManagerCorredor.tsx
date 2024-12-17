
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
// import {  removeUserFromProject } from "@/api/TeamAPI";
// import { toast } from "react-toastify";
// import { Menu, Transition } from "@headlessui/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
// import { Fragment } from "react";
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
  

  // const queryClient = useQueryClient();
  // const { mutate } = useMutation({
  //   mutationFn: removeUserFromProject,
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  //   onSuccess: (data) => {
  //     toast.success(data);
  //     queryClient.invalidateQueries({ queryKey: ["empresa", empresaId] });
  //   },
  // });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to={"/404"} />;
  if (data)
    return (
      <>
        <h1 className="text-3xl text-gray-300 font-black">Asignar Administrador</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
         Cambia el Administrador del esta Empresa
        </p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(location.pathname + "?updateManager=true")}
          >
            Cambiar Manager
          </button>

          <Link
            to={`/integrador/${empresaId}`}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Volver al Integrador
          </Link>
        </nav>

        <h2 className="text-3xl text-gray-300 font-black my-10">Manager actual</h2>
        {data ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >

              <li
                key={data._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-2xl font-black text-gray-600">
                      {data.name + ' ' + data.firstName + ' ' + data.lastName }
                    </p>
                    <p className="text-sm text-gray-400">{data.email}</p>
                  </div>
                </div>
                {/* <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() =>
                              mutate({ empresaId, userId: data._id })
                            }
                          >
                            Eliminar del Proyecto
                          </button>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div> */}
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
