import { Edit2, Trash, InfoCircle } from "iconsax-react";
import { AuthData } from "../../contexts/auth-context";

interface UsersTableProps {
  users: AuthData[];
  fetching: boolean;
  search: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, fetching, search }) => {
  const usersList = users
    .filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.id}`.includes(search)
    )
    .map((user) => (
      <tr className="border-b border-boxSecondary" key={user.id}>
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div>
              <h1 className="text-textPrimary">
                {user.firstName} {user.lastName}
              </h1>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">{user.id}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors cursor-pointer">
              <Edit2 size={20} variant="Bold" />
              <span>Editar</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
              <Trash size={20} variant="Bold" />
              <span>Deletar</span>
            </div>
          </div>
        </td>
      </tr>
    ));

  return (
    <div className="mt-6 overflow-x-auto teste">
      <table className="w-full text-left text-sm text-gray-500 table-auto">
        <thead className="text-xs text-gray-500 uppercase bg-boxPrimary border border-boxSecondary">
          <tr>
            <th scope="col" className="px-6 py-3">Usuário</th>
            <th scope="col" className="px-6 py-3">ID do Usuário</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="text-sm font-semibold">
          {fetching ? ( 
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                <div className="flex items-center justify-center h-full">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ) : usersList.length > 0 ? (
            usersList
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                <div className="flex items-center justify-center h-full gap-2">
                  <InfoCircle className="w-5 h-5" />
                  <p className="text-sm font-semibold">Nenhum resultado encontrado</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
