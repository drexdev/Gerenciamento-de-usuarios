import { ReactNode, useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { CloseCircle } from "iconsax-react";
import { UserCreate } from "./user-create-form";
import { UserUpdate, UserUpdateProps } from "./user-update-form";
import { User } from "../../../hooks/useDashboard";

interface UserDialogProps {
  isOpen: boolean;
  title: string; // Título do modal
  description: string; // Descrição do modal
  children: ReactNode;
  initialData?: Partial<
    Pick<UserUpdateProps, "firstName" | "lastName" | "email">
  >;
  type: "create" | "update";
  onOpenChange: (open: boolean) => void;
  onSubmit(firstName: string, lastName: string, email: string): Promise<User>;
}

interface ErrorState {
  title: string;
  message: string;
}

export function UserDialog({
  isOpen,
  title,
  description,
  children,
  initialData,
  onOpenChange,
  onSubmit,
  type,
}: UserDialogProps) {
  const [error, setError] = useState<ErrorState | null>();

  // Gerando erro de formulário.
  const handleError = (title?: string, message?: string) => {
    if (title && message) {
      setError({ title, message });
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    handleError(); // Ao abrir o modal limpa o erro;
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="z-50 w-screen h-screen bg-background/70 backdrop-blur-sm inset-0 fixed" />
        <Dialog.Content className="z-50 animate-showDialog w-full md:w-[400px] h-full md:h-auto p-6 bg-boxSecondary/40 backdrop-blur-xl rounded-none md:rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-base md:text-xl font-bold !leading-5">
            {title}

            <Dialog.Close asChild>
              <button className="absolute top-6 right-6">
                <CloseCircle className="w-6 h-6 cursor-pointer" />
              </button>
            </Dialog.Close>
          </Dialog.Title>

          <Dialog.Description className="text-gray-500 text-sm !leading-5">
            {description}
          </Dialog.Description>

          {error && (
            <div className="mt-3 flex items-start justify-center flex-col py-2 px-4 w-full rounded-md bg-red-700/20 border border-red-400 animate-fadeIn">
              <h1 className="text-sm font-semibold text-red-400">
                {error.title}
              </h1>
              <p className="text-xs font-medium text-red-200">
                {error.message}
              </p>
            </div>
          )}

          {type === "create" ? (
            <UserCreate
              onError={handleError}
              onSubmit={onSubmit}
              {...initialData}
            />
          ) : (
            <UserUpdate
              onError={handleError}
              onSubmit={onSubmit}
              {...initialData}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
