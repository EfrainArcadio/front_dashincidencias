import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'
import Logo from '@/components/Logo'

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()
    if(isLoading) return 'Cargando...'
    if(isError) {
        return <Navigate to='/auth/login' />
    }

    if(data) return (
        <>
            <header className='bg-white '>
                <div className='px-4 flex lg:flex-row justify-between items-center'>
                    <div className='w-60'>
                        <Link to={'/'}>
                        
                            <Logo />
                        </Link>
                    </div>

                    <NavMenu 
                        name={data.name}
                    />
                </div>
            </header>

            <section className='max-w-screen-2xl mx-auto mt-5 px-5'>
                <Outlet />
            </section>

            <footer className='py-5'>
                <p className='text-center text-gray-400'>
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
