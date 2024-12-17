import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardIntegradores from '@/views/DashboardIntegradores'
import DashboardCorredores from '@/views/DashboardCorredores'
import CreateEmpresaView from './views/integradores/CreateIntegradorView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileLayout from './layouts/ProfileLayout'
import NotFound from './views/404/NotFound'
// import EditIntegradorview from './views/integradores/EditIntegradorView'
import ProfileGeneral from './views/ProfileGeneral'
import CreateCorredorView from './views/corredores/CreateCorredorView'
import CorredorDetailsView from './views/corredores/CorredorDetailsView'
import DashboardFallas from './views/fallas/FallaDetailsView'
import DashboardUnidades from './views/unidades/unidadDetailsView'
import CreateFallaView from './views/fallas/CreateFallaView'
import CreateUnidadView from './views/unidades/createUnidadView'
import CorredorTeamView from './views/corredores/CorredorTeamView'
import AddManagerIntegrador from './views/integradores/AddManagerIntegrador'
import AddManagerCorredor from './views/corredores/AddManagerCorredor'
// import EditEmpresaView from './views/empresas/EditEmpresaView'
import EditFallaView from './views/fallas/EditFallaView'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<ProfileGeneral />} index />
                    <Route path='/ort' element={<DashboardIntegradores />}  />
                    <Route path='/fallas' element={<DashboardFallas />}  />
                    <Route path='/falla/create' element={<CreateFallaView />}  />
                    <Route path='/falla/:idFalla/edit' element={<EditFallaView />}  />
                    <Route path='/integrador/:empresaId' element={<DashboardCorredores />} />
                    <Route path='/integrador/:empresaId/manager' element={<AddManagerIntegrador />} />
                    <Route path='/integrador/create' element={<CreateEmpresaView />} />
                    <Route path='/integrador/:empresaId/edit' element={<EditFallaView />} />
                    <Route path='/integrador/:empresaId/corredor/create' element={<CreateCorredorView />} />
                    {/* corredoress */}
                    <Route path='/corredor/:empresaId' element={<CorredorDetailsView />} />
                    <Route path='/corredor/:empresaId/manager' element={<AddManagerCorredor />} />
                    <Route path='/corredor/:empresaId/unidades' element={<DashboardUnidades />} />
                    <Route path='/corredor/:empresaId/unidades/create' element={<CreateUnidadView />} />
                    <Route path='/corredor/:empresaId/team' element={<CorredorTeamView />} />
                    {/* Profile */}
                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />} />
                    <Route path='/auth/request-code' element={<RequestNewCodeView />} />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />
                    <Route path='/auth/new-password' element={<NewPasswordView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='*' element={<NotFound />}  />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}