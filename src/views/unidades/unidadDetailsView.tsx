import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import {  getUnidadesByIdCorredor } from '@/api/UnidadAPI'

export default function UnidadDetailsView () {
  const params = useParams()
  const empresaId = params.empresaId!

  const location = useLocation()
  const navigate = useNavigate()
  const { data: user, isLoading: authLoading } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['unidad', empresaId],
    queryFn: () => getUnidadesByIdCorredor(empresaId),
    retry: false
  })
  // console.log(data)
  if (isLoading && authLoading) return 'Cargando...'
  if (data && user) return (
    <>
      <nav className="my-10 flex justify-center">
        <Link
          className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to='create'
        >
          Asignar Unidad
        </Link>
      </nav>
      {data.length ? (
        <ul role="list" className="space-y-1  ">
          {data.map((unidad) => (
            <li key={unidad._id} className="flex justify-between gap-x-4 px-3 py-5 bg-white divide-gray-100 border border-gray-100 mt-2 shadow-white shadow-sm">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <div className='mb-2'>
                    {/* { isCreador(unidad, user._id) ?
                      <p className='font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5'>Manager</p> :
                      <p className='font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5'>Colaborador</p>
                    } */}
                  </div>
                  <Link to={`/unidad/${unidad._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{unidad.economico}</Link>
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
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <Menu.Item>
                        <Link to={`/unidad/${unidad._id}`}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                          Ver unidad
                        </Link>
                      </Menu.Item>

                      {/* { isCreador(unidad.creador, user._id) && ( */}
                        <>
                          <Menu.Item>
                            <Link to={`/unidad/${unidad._id}/edit`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                              Editar unidad
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type='button'
                              className='block px-3 py-1 text-sm leading-6 text-red-500'
                              onClick={() => navigate(location.pathname + `?deleteProject=${unidad._id}`)}
                            >
                              Eliminar unidad
                            </button>
                          </Menu.Item>
                        </>
                      {/* // )} */}

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
            to='/unidad/create'
            className=" text-fuchsia-500 font-bold"
          >Crear unidad</Link>
        </p>
      )}
    </>
  )
}

