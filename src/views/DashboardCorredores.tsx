import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getCorredoresByIdIntegrador } from "@/api/EmpresaAPI";
import { isCreador, isJUDCV } from "@/utils/policies";

export default function DashboardCorredores() {
  const params = useParams();
  const empresaId = params.empresaId!;
  const { data: user, isLoading: authLoading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["empresa", empresaId],
    queryFn: () => getCorredoresByIdIntegrador(empresaId),
    retry: false,
  });

  if (isLoading && authLoading) return "Cargando...";
  if (data && user)
    return (
      <>
        {isJUDCV(user?.email) && (
          <nav className="my-10 flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:justify-between text-center ">
            <>
              <Link
                className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to={`corredor/create`}
              >
                Agregar Corredor
              </Link>
              <Link
                className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to={`manager`}
              >
                Agregar Manager
              </Link>
            </>
          </nav>
        )}
        {data.length ? (
          <ul role="list" className="ssm:grid ssm:grid-flow-row ">
            {data.map((empresa) => (
              <li
                key={empresa._id}
                className="flex flex-col gap-x-4 px-3 py-5 bg-white divide-gray-100 border border-gray-100 mt-2 shadow-white shadow-sm"
              >
                <div className="flex  justify-between">
                  {/* Datos */}
                  <div className="flex flex-col min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                      <Link
                        to={`/corredor/${empresa._id}`}
                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                      >
                        {empresa.empresaName}
                      </Link>
                    </div>
                    <div className="flex min-w-0 gap-x-4">
                      <p className="text-gray-500">
                        {" "}
                        Unidades: {empresa.workSpace.length}
                      </p>
                    </div>
                  </div>
                  {/* endDatos */}
                  {/* Menu */}
                  <div className="flex shrink-0 items-center gap-x-6">
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
                            <Link
                              to={`/corredor/${empresa._id}`}
                              className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                              Ver Corredor
                            </Link>
                          </Menu.Item>

                          {isCreador(empresa.createdBy, user._id) && (
                            <>
                              <Menu.Item>
                                <Link
                                  to={`/corredor/${empresa._id}/edit`}
                                  className="block px-3 py-1 text-sm leading-6 text-gray-900"
                                >
                                  Editar Corredor
                                </Link>
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  {/* endMenu */}
                </div>
                {/* TasksByStatus */}
                <div className="flex flex-col min-w-0 gap-x-4">
                  <p className="text-gray-500 text-lg font-black">
                    {" "}
                    Incidencias{" "}
                  </p>
                  <div className="grid grid-flow-row ms:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1">
                    <h3 className="capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 border-t-slate-500">
                      Pendientes:{" "}
                      {
                        empresa.tasks.filter(
                          (task) => task.status === "pending"
                        ).length
                      }
                    </h3>
                    <h3 className="capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 border-t-red-500">
                      Espera:{" "}
                      {
                        empresa.tasks.filter((task) => task.status === "onHold")
                          .length
                      }
                    </h3>
                    <h3 className="capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 border-t-blue-500">
                      Progreso:{" "}
                      {
                        empresa.tasks.filter(
                          (task) => task.status === "inProgress"
                        ).length
                      }
                    </h3>
                    <h3 className="capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 border-t-amber-500">
                      Revisión:{" "}
                      {
                        empresa.tasks.filter(
                          (task) => task.status === "underReview"
                        ).length
                      }
                    </h3>
                    <h3 className="capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 border-t-emerald-500">
                      Completado:{" "}
                      {
                        empresa.tasks.filter(
                          (task) => task.status === "completed"
                        ).length
                      }
                    </h3>
                  </div>
                </div>
                {/* endTasksByStatus */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-20">
            No hay corredores aún {""}
            <Link to="/projects/create" className=" text-fuchsia-500 font-bold">
              Crear Corredor
            </Link>
          </p>
        )}
      </>
    );
}
