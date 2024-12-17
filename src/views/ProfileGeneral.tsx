// import { getEmpresaByUser } from '@/api/EmpresaAPI';
import { useAuth } from '@/hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileGeneral() {
  const { data: user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate();
  // const userId = user?._id ?? ''

  
  // const { data , isLoading } = useQuery({
  //   queryKey: ['empresa',userId],
  //   queryFn: () => getEmpresaByUser(userId),
  //   retry: false
  // })

  const empresaId = user?.empresa
  // console.log(user?.account)
  useEffect(() => {
    if (!authLoading && user?.account) {
      switch (user.account) {
        case 'Administrador':
          navigate('/ort');
          break;
        case 'Integrador':
          navigate(`/integrador/${empresaId}`);
          break;
        case 'Corredor':
          navigate(`/corredor/${empresaId}`);
          break;
        case 'Tecnico':
          navigate(`/corredor/${empresaId}`);
          break;
          case 'Supervisor':
          navigate(`/corredor/${empresaId}`);
          break;
        default:
          console.error('Nivel de usuario no reconocido');
      }
    }
  }, [user?.account, authLoading, navigate, empresaId]);
  if (authLoading) return 'Cargando...'
  // Resto del contenido del perfil
  return (
    <div>
      {user?.account === 'General' && <p className='text-center text-gray-300'>Contacta a tu administrador</p>}
      {/* Resto del contenido del perfil */}
    </div>
  );
}
