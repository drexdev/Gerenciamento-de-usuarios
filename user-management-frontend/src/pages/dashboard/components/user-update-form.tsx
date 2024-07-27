import { useState } from "react";
import { User } from "../../../hooks/useDashboard";

export interface UserUpdateProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  onSubmit(firstName: string, lastName: string, email: string): Promise<User>;
  onError(title?: string, message?: string): void;
}
export const UserUpdate = ({
  firstName,
  lastName,
  email,
  onSubmit,
  onError,
}: UserUpdateProps) => {
  const [firstNameValue, setFirstNameValue] = useState<string>(firstName || "");
  const [lastNameValue, setLastNameValue] = useState<string>(lastName || "");
  const [emailValue, setEmailValue] = useState<string>(email || "");

  // Verifica se o formulário é válido;
  const isValidForm = () => {
    if (!firstNameValue || !lastNameValue || !emailValue) { // Caso os campos estejam vazios, exibe uma mensagem de erro;
      return {
        isValid: false,
        title: "Todos os campos devem ser preenchidos",
        message: "Todos os campos devem ser preenchidos.",
      };
    }

    const nameRegex = /^[a-zA-Zà-úÀ-Ú]+$/; // Verifica se o nome contém apenas letras;
    if (!nameRegex.test(firstNameValue) || !nameRegex.test(lastNameValue)) {
      return {
        isValid: false,
        title: "Nome ou sobrenome inválido",
        message: "O nome e o sobrenome deve conter apenas letras.",
      };
    }

    // Verifica se o email é válido;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(emailValue)) {
      return {
        isValid: false,
        title: "Email inválido",
        message: "O email deve ser um email válido.",
      };
    }

    return { isValid: true };
  };

  // Enviar os dados para o backend;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const {
      isValid,
      title: formValidTitle,
      message: formValidMessage,
    } = isValidForm();

    if (!isValid) {
      // Caso o formulário seja inválido, exibe uma mensagem de erro;
      if (formValidTitle && formValidMessage) {
        onError(formValidTitle, formValidMessage);
      }
    } else {
      // Chama a função para criar o usuário;
      onSubmit(firstNameValue, lastNameValue, emailValue)
        .then(() => onError()) // Caso o usuário seja criado com sucesso, retira a mensagem de erro;
        .catch((error) => {
          onError("Um erro ocorreu.", error.message);
        });
    }
  };

  return (
    <form className="mt-3 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="form-group">
          <label className="label">Nome:</label>

          <input
            type="text"
            name="firstName"
            placeholder="Ex.: João"
            minLength={3}
            maxLength={30}
            value={firstNameValue}
            onChange={(event) => setFirstNameValue(event.target.value)}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">
            Sobrenome:
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Ex.: Silva"
            minLength={3}
            maxLength={30}
            value={lastNameValue}
            onChange={(event) => setLastNameValue(event.target.value)}
            className="input"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="label">E-mail:</label>

        <input
          type="email"
          name="email"
          placeholder="Ex.: 7YqFP@example.com"
          minLength={3}
          maxLength={30}
          value={emailValue}
          onChange={(event) => setEmailValue(event.target.value)}
          className="input"
          required
        />
      </div>

      <button
        type="submit"
        onClick={(event) => handleSubmit(event)}
        className="submit-button"
      >
        Atualizar Usuário
      </button>
    </form>
  );
};
