// import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  return (
    <>
        <div className='min-h-screen'>
            <div className='m-auto w-11/12 md:w-[450px]'>
                    <Outlet />
            </div>
        </div>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
