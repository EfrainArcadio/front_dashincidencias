import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamMember } from "@/types/index";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateManager } from "@/api/EmpresaAPI";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

const SearchManagerResult = ({ user, reset }: SearchResultProps) => {
  const currentUrl = window.location.href;

  const account = currentUrl.includes('corredor') ? 'Corredor' :
  currentUrl.includes('integrador') ? 'Integrador' : 'General'
  
  let accountUser = user.account
  accountUser = account
  const navigate = useNavigate();
  const params = useParams();
  const empresaId = params.empresaId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateManager,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["empresa", empresaId] });
    },
  });

  const handleAddUserToProject = () => {
    const data = {
      empresaId,
      id: user._id,
      account: accountUser
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUserToProject}
        >
          Asignar al {account}
        </button>
      </div>
    </>
  );
};

export default SearchManagerResult;
