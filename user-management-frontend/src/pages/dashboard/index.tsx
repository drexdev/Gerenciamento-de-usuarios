import { AddCircle } from "iconsax-react";
import Header from "../../components/header";
import { useState } from "react";
import useFetchUsers from "../../hooks/fetchUsers";
import UsersTable from "./list-users";

export default function Dashboard() {
  const { users, fetching } = useFetchUsers(); // Importa os dados dos usuários
  const [search, setSearch] = useState(""); // Valor da input de pesquisa

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="w-full flex items-center justify-between gap-2 max-sm:flex-col max-sm:gap-4">
          <div className="max-sm:text-center">
            <h1 className="text-xl font-bold">
              Lista de Usuarios
              <span className="text-gray-500 ml-1 text-base">
                ({users.length.toLocaleString("pt-BR")})
              </span>
            </h1>
            <p className="text-sm text-gray-500">
              Visualize todos os usuários cadastrados no sistema.
            </p>
          </div>
          <div className="flex items-center gap-2 max-sm:w-full">
            <input
              type="text"
              placeholder="Pesquise por usuários..."
              className="w-full md:w-80 px-4 py-3 text-sm bg-boxSecondary rounded-md border border-boxSecondary"
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
            <button
              className="px-5 py-3 text-sm bg-primary rounded-md transition-all hover:shadow-primary sm:active:scale-95 active:scale-105 flex items-center justify-center gap-2 text-white font-semibold max-sm:w-full max-sm:fixed max-sm:h-14 max-sm:bottom-0 max-sm:left-0 max-sm:z-50 max-sm:rounded-none"
              onClick={() => {
                // TODO: Cadastrar novo usuário
              }}
            >
              <AddCircle size={20} />
              <span>Cadastrar</span>
            </button>
          </div>
        </div>
        
        <UsersTable users={users} fetching={fetching} search={search}  />
      </div>
    </>
  );
}
