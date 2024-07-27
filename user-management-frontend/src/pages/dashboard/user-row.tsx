import { useState } from "react";
import { UserDialog } from "./components/user-form-dialog";
import { Edit2, Trash } from "iconsax-react";
import { User } from "../../hooks/useDashboard";
import { toast } from "react-toastify";

interface UserRowProps {
  user: User;
  onEdit(data: User): Promise<User>;
  onDelete(id: number): Promise<number>;
}
export default function UserRow({ user, onDelete, onEdit }: UserRowProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmitUpdateUser = (
    firstName: string,
    lastName: string,
    email: string
  ): Promise<User> => {
    return onEdit({
      id: user.id,
      firstName,
      lastName,
      email,
    }).then((user) => {
      setDialogOpen(false);
      toast.success("Usuário atualizado com sucesso!");
      return user;
    });
  };

  const handleDeleteUser = () => {
    onDelete(user.id);
    toast.success("Usuário: " + user.email + " excluido com sucesso!");
  };

  return (
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
          <UserDialog
            isOpen={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Adicionar Usuário"
            description="Insira os dados do novo usuário, incluindo nome, sobrenome, email e senha."
            onSubmit={handleSubmitUpdateUser}
            initialData={user}
            type="update"
          >
            <div className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors cursor-pointer">
              <Edit2 size={20} variant="Bold" />
              <span>Editar</span>
            </div>
          </UserDialog>

          <div
            onClick={handleDeleteUser}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <Trash size={20} variant="Bold" />
            <span>Deletar</span>
          </div>
        </div>
      </td>
    </tr>
  );
}
