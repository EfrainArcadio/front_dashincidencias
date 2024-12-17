import { getFallas } from "@/api/FallaAPI"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react"
import { Link } from "react-router-dom"

const FallaDetailsView = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['falla'],
    queryFn: getFallas
  })
  
  if (isLoading) return 'Cargando..'
  if (data)
    return (
      <>
        <nav className="my-10 flex justify-between">
          <Link
            className=" bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to='/falla/create'
          >
            Crear Falla
          </Link>
        </nav>
        {data.length ? (
        <ul role="list" className="space-y-1  ">
          {data.map((falla) => (
            <li key={falla._id} className="flex justify-between gap-x-4 px-3 py-5 bg-white divide-gray-100 border border-gray-100 mt-2 shadow-white shadow-sm">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <Link to={`/falla/${falla._id}`}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{falla.name}</Link>
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
                        <Link to={`/falla/${falla._id}`}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                          Ver falla
                        </Link>
                      </Menu.Item>

                      {/* { isCreador(falla, user._id) && ( */}
                        <>
                          <Menu.Item>
                            <Link to={`/falla/${falla._id}/edit`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                              Editar falla
                            </Link>
                          </Menu.Item>
                        </>
                      {/* )} */}

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
            to='/falla/create'
            className=" text-fuchsia-500 font-bold"
          >Crear falla</Link>
        </p>
      )}
      </>
    )
}

export default FallaDetailsView
