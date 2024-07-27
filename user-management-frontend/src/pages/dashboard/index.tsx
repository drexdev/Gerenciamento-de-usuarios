import { useState } from "react";

import Header from "../../components/header";

import { AddCircle } from "iconsax-react";

import useDashboard from "../../hooks/useDashboard";
import UsersTable from "./list-users";
import { UserDialog } from "./components/user-form-dialog";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { users, fetching, createUser, deleteUser, updateUser } =
    useDashboard(); // Importa os dados dos usuários
  const [search, setSearch] = useState(""); // Valor da input de pesquisa

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmitCreateUser = (
    firstName: string,
    lastName: string,
    email: string,
    password?: string
  ) => {
    return createUser(firstName, lastName, email, password as string).then(
      (user) => {
        setDialogOpen(false);
        toast.success("Usuário criado com sucesso!");
        return user;
      }
    );
  };

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

            <UserDialog
              isOpen={dialogOpen}
              onOpenChange={setDialogOpen}
              title="Adicionar Usuário"
              description="Insira os dados do novo usuário, incluindo nome, sobrenome, email e senha."
              onSubmit={handleSubmitCreateUser}
              type="create"
            >
              <div className="px-5 py-3 text-sm bg-primary rounded-md transition-all hover:shadow-primary sm:active:scale-95 active:scale-105 flex items-center justify-center gap-2 text-white font-semibold max-sm:w-full max-sm:fixed max-sm:h-14 max-sm:bottom-0 max-sm:left-0 max-sm:z-50 max-sm:rounded-none">
                <AddCircle size={20} />
                <span>Cadastrar</span>
              </div>
            </UserDialog>
          </div>
        </div>

        <UsersTable
          users={users}
          fetching={fetching}
          search={search}
          deleteUser={deleteUser}
          updateUser={updateUser}
        />
      </div>
    </>
  );
}
