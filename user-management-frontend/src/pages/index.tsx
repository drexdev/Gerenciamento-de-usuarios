import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export default function Home() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
            <h1 className="text-3xl font-bold">Bem vindo ao ManageUsers!</h1>
            
            <button onClick={() => navigate(user ? "/dashboard" : "/login")} className="px-4 py-2 text-lg font-semibold text-white bg-indigo-500 rounded mt-4 hover:bg-indigo-600 transition-all cursor-pointer text-center">
                {user ? "Acessar minha conta" : "Fazer login"}
            </button>
        </div>
    )
}