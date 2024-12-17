import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getIntegradores } from '@/api/EmpresaAPI'
import { useAuth } from '@/hooks/useAuth'
import { isCreador } from '@/utils/policies'

export default function DashboardIntegradores() {

  const { data: user, isLoading: authLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['empresa'],
    queryFn: getIntegradores
  })

  if (isLoading && authLoading) return 'Cargando...'
  if (data && user) return (
    <>
      <nav className="my-10 flex space-x-1 ">
        <Link
          className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to='/integrador/create'
        >
          Crear Integrador
        </Link>
        <Link
          className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to='/fallas'
        >
          Catalogo Fallas
        </Link>
      </nav>
      {data.length ? (
        <ul role="list" className="flex flex-col lg:flex-wrap lg:flex-row lg:space-x-1">
          {data.map((integrador) => (
            <li key={integrador._id} className="flex justify-between gap-x-4 px-3 py-5 bg-white divide-gray-100 border border-gray-100 mt-2 shadow-white shadow-sm lg:max-w-xs lg:flex">
              <div className="flex flex-col min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <Link to={`/integrador/${integrador._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{integrador.empresaName}</Link>
                </div>
                <div className="flex min-w-0 gap-x-4">
                  <p className='text-gray-500'> Corredores: {integrador.workSpace.length}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute  z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <Menu.Item>
                        <Link to={`/integrador/${integrador._id}`}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                          Ver Integrador
                        </Link>
                      </Menu.Item>

                      {isCreador(integrador.createdBy, user._id) && (
                        <>
                          <Menu.Item>
                            <Link to={`/integrador/${integrador._id}/edit`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                              Editar Integrador
                            </Link>
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-20">No hay nada aún {''}
          <Link
            to='/integrador/create'
            className=" text-fuchsia-500 font-bold"
          >Crear Integrador</Link>
        </p>
      )}

    </>
  )
}
